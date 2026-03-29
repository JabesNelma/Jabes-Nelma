"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Save, Loader2, X, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";

const blogFormSchema = z.object({
  title: z.string().min(1, "Judul wajib diisi").max(200, "Judul terlalu panjang"),
  slug: z
    .string()
    .min(1, "Slug wajib diisi")
    .max(200, "Slug terlalu panjang")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug harus huruf kecil dengan tanda hubung"),
  excerpt: z.string().max(500, "Ringkasan terlalu panjang").optional(),
  content: z.string().min(1, "Konten wajib diisi"),
  coverImage: z.string().url("Harus URL yang valid").optional().or(z.literal("")),
  tags: z.array(z.string()).optional(),
  author: z.string().default("Admin"),
  published: z.boolean().default(false),
  readTime: z.number().min(1).max(120).default(5),
});

type BlogFormValues = z.infer<typeof blogFormSchema>;

interface BlogFormProps {
  initialData?: {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    content: string;
    coverImage: string | null;
    tags: string[] | null;
    author: string;
    published: boolean;
    readTime: number;
  };
  isEditing?: boolean;
}

export function BlogForm({ initialData, isEditing = false }: BlogFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [tagInput, setTagInput] = React.useState("");

  const form = useForm<BlogFormValues>({
    resolver: zodResolver(blogFormSchema),
    defaultValues: {
      title: initialData?.title || "",
      slug: initialData?.slug || "",
      excerpt: initialData?.excerpt || "",
      content: initialData?.content || "",
      coverImage: initialData?.coverImage || "",
      tags: initialData?.tags || [],
      author: initialData?.author || "Admin",
      published: initialData?.published || false,
      readTime: initialData?.readTime || 5,
    },
  });

  // Auto-generate slug from title
  const title = form.watch("title");
  React.useEffect(() => {
    if (!isEditing || !initialData) {
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
      if (slug !== form.getValues("slug")) {
        form.setValue("slug", slug);
      }
    }
  }, [title, form, isEditing, initialData]);

  const handleAddTag = () => {
    const trimmedTag = tagInput.trim();
    if (trimmedTag && !form.getValues("tags")?.includes(trimmedTag)) {
      const currentTags = form.getValues("tags") || [];
      form.setValue("tags", [...currentTags, trimmedTag]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const currentTags = form.getValues("tags") || [];
    form.setValue(
      "tags",
      currentTags.filter((tag) => tag !== tagToRemove)
    );
  };

  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const onSubmit = async (data: BlogFormValues) => {
    setIsSubmitting(true);
    try {
      const url = isEditing
        ? `/api/admin/blog/${initialData?.id}`
        : "/api/admin/blog";
      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        toast.success(
          isEditing
            ? "Postingan blog berhasil diperbarui"
            : "Postingan blog berhasil dibuat"
        );
        router.push("/internal-portal-xyz/blog");
        router.refresh();
      } else {
        toast.error(result.message || "Gagal menyimpan postingan blog");
      }
    } catch {
      toast.error("Gagal menyimpan postingan blog");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? "Edit Postingan Blog" : "Buat Postingan Blog"}</CardTitle>
        <CardDescription>
          {isEditing
            ? "Perbarui detail postingan blog Anda di bawah ini."
            : "Isi detail untuk membuat postingan blog baru."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Title & Slug */}
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Judul *</FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan judul postingan" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug *</FormLabel>
                    <FormControl>
                      <Input placeholder="url-postingan" {...field} />
                    </FormControl>
                    <FormDescription>
                      Pengenal ramah URL (dibuat otomatis)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Excerpt */}
            <FormField
              control={form.control}
              name="excerpt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ringkasan</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Ringkasan singkat postingan..."
                      className="resize-none"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Ringkasan singkat untuk pratinjau (maks 500 karakter)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Content */}
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Konten *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tulis konten postingan blog Anda dalam Markdown..."
                      className="min-h-[300px] font-mono"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Tulis konten Anda menggunakan sintaks Markdown
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Cover Image */}
            <FormField
              control={form.control}
              name="coverImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL Gambar Sampul</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://contoh.com/gambar.jpg"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Masukkan URL untuk gambar sampul
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Tags */}
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tag</FormLabel>
                  <div className="flex gap-2">
                    <FormControl>
                      <Input
                        placeholder="Masukkan tag"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={handleTagInputKeyDown}
                      />
                    </FormControl>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={handleAddTag}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {field.value?.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="cursor-pointer"
                        onClick={() => handleRemoveTag(tag)}
                      >
                        {tag}
                        <X className="ml-1 h-3 w-3" />
                      </Badge>
                    ))}
                  </div>
                  <FormDescription>
                    Tekan Enter atau klik + untuk menambah tag. Klik tag untuk menghapusnya.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Author & Read Time */}
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pengarang</FormLabel>
                    <FormControl>
                      <Input placeholder="Admin" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="readTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Waktu Baca (menit)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        max={120}
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 5)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Published */}
            <FormField
              control={form.control}
              name="published"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Dipublikasikan</FormLabel>
                    <FormDescription>
                      {isEditing
                        ? "Alihkan untuk mempublikasikan atau tidak mempublikasikan postingan ini"
                        : "Centang untuk mempublikasikan segera setelah pembuatan"}
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/internal-portal-xyz/blog")}
                disabled={isSubmitting}
              >
                Batal
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isEditing ? "Mengupdate..." : "Membuat..."}
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    {isEditing ? "Perbarui Postingan" : "Buat Postingan"}
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
