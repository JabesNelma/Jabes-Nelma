"use client";

import * as React from "react";
import { format } from "date-fns";
import { ArrowLeft, Mail, MailOpen, Reply } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

export interface MessageDetail {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  isRead: boolean;
  repliedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

interface MessageDetailProps {
  message: MessageDetail;
  onRefresh: () => void;
}

export function MessageDetail({ message, onRefresh }: MessageDetailProps) {
  const [isToggling, setIsToggling] = React.useState(false);

  const handleToggleRead = async () => {
    setIsToggling(true);
    try {
      const response = await fetch(`/api/admin/messages/${message.id}/read`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isRead: !message.isRead }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(
          `Message marked as ${!message.isRead ? "read" : "unread"}`
        );
        onRefresh();
      } else {
        toast.error(data.message || "Failed to update message");
      }
    } catch {
      toast.error("Failed to update message");
    } finally {
      setIsToggling(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/internal-portal-xyz/messages">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <CardTitle>{message.subject || "No Subject"}</CardTitle>
              <CardDescription>
                From {message.name} ({message.email})
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={message.isRead ? "secondary" : "default"}>
              {message.isRead ? (
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
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Message Info */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">From</p>
            <p className="font-medium">{message.name}</p>
            <a
              href={`mailto:${message.email}`}
              className="text-sm text-primary hover:underline"
            >
              {message.email}
            </a>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">
              Received
            </p>
            <p className="font-medium">
              {format(new Date(message.createdAt), "PPP 'at' p")}
            </p>
          </div>
        </div>

        <Separator />

        {/* Message Content */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">Message</p>
          <div className="rounded-lg bg-muted/50 p-4">
            <p className="whitespace-pre-wrap">{message.message}</p>
          </div>
        </div>

        {/* Actions */}
        <Separator />
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
          <Button
            variant="outline"
            onClick={handleToggleRead}
            disabled={isToggling}
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
          </Button>
          <Button asChild>
            <a href={`mailto:${message.email}?subject=Re: ${message.subject || "Your message"}`}>
              <Reply className="mr-2 h-4 w-4" />
              Reply via Email
            </a>
          </Button>
        </div>

        {/* Reply Status */}
        {message.repliedAt && (
          <p className="text-sm text-muted-foreground text-right">
            Replied on {format(new Date(message.repliedAt), "PPP 'at' p")}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
