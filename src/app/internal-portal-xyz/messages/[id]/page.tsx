"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2 } from "lucide-react";

import {
  MessageDetail,
  type MessageDetail as MessageType,
} from "@/components/admin/messages/message-detail";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ViewMessagePage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [message, setMessage] = React.useState<MessageType | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const fetchMessage = React.useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/admin/messages/${id}`);
      const data = await response.json();

      if (data.success) {
        setMessage(data.message);
      } else {
        setError(data.message || "Failed to load message");
      }
    } catch {
      setError("Failed to load message");
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  React.useEffect(() => {
    fetchMessage();
  }, [fetchMessage]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Button variant="ghost" disabled>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Messages
          </Button>
        </motion.div>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !message) {
    return (
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Button variant="ghost" onClick={() => router.push("/internal-portal-xyz/messages")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Messages
          </Button>
        </motion.div>
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-lg font-medium text-destructive">
                {error || "Message not found"}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                The message you&apos;re looking for doesn&apos;t exist or has been deleted.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Button variant="ghost" asChild>
          <a href="/internal-portal-xyz/messages">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Messages
          </a>
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <MessageDetail message={message} onRefresh={fetchMessage} />
      </motion.div>
    </div>
  );
}
