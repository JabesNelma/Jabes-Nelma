"use client";

import * as React from "react";
import Link from "next/link";
import { format } from "date-fns";
import { MoreHorizontal, Eye, Mail, MailOpen, Trash2 } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

export interface Message {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

interface MessagesTableProps {
  messages: Message[];
  onRefresh: () => void;
}

export function MessagesTable({ messages, onRefresh }: MessagesTableProps) {
  const [deleteId, setDeleteId] = React.useState<string | null>(null);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [togglingId, setTogglingId] = React.useState<string | null>(null);

  const handleToggleRead = async (id: string, currentStatus: boolean) => {
    setTogglingId(id);
    try {
      const response = await fetch(`/api/admin/messages/${id}/read`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isRead: !currentStatus }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(
          `Message marked as ${!currentStatus ? "read" : "unread"}`
        );
        onRefresh();
      } else {
        toast.error(data.message || "Failed to update message");
      }
    } catch {
      toast.error("Failed to update message");
    } finally {
      setTogglingId(null);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/admin/messages/${deleteId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Message deleted successfully");
        onRefresh();
      } else {
        toast.error(data.message || "Failed to delete message");
      }
    } catch {
      toast.error("Failed to delete message");
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
    }
  };

  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Mail className="h-12 w-12 text-muted-foreground/50 mb-4" />
        <h3 className="text-lg font-medium">No messages</h3>
        <p className="text-sm text-muted-foreground">
          There are no messages to display.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="w-[70px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {messages.map((message) => (
              <TableRow
                key={message.id}
                className={!message.isRead ? "bg-muted/30" : undefined}
              >
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    {!message.isRead && (
                      <span className="h-2 w-2 rounded-full bg-primary" />
                    )}
                    {message.name}
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {message.email}
                </TableCell>
                <TableCell>
                  <span className="line-clamp-1">
                    {message.subject || "No subject"}
                  </span>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={message.isRead ? "secondary" : "default"}
                    className="cursor-pointer"
                    onClick={() => handleToggleRead(message.id, message.isRead)}
                  >
                    {togglingId === message.id ? (
                      <span className="animate-pulse">...</span>
                    ) : message.isRead ? (
                      <>
                        <MailOpen className="mr-1 h-3 w-3" />
                        Read
                      </>
                    ) : (
                      <>
                        <Mail className="mr-1 h-3 w-3" />
                        Unread
                      </>
                    )}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {format(new Date(message.createdAt), "MMM d, yyyy")}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href={`/internal-portal-xyz/messages/${message.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleToggleRead(message.id, message.isRead)}
                      >
                        {message.isRead ? (
                          <>
                            <Mail className="mr-2 h-4 w-4" />
                            Mark as Unread
                          </>
                        ) : (
                          <>
                            <MailOpen className="mr-2 h-4 w-4" />
                            Mark as Read
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={() => setDeleteId(message.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Message</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this message? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
