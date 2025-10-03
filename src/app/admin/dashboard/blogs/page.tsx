/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { useState, useCallback, useRef } from "react";
import {
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  Save,
  Eye,
  Calendar,
  User,
  FileText,
  Sparkles,
  X,
  Clock,
  Image,
  Pencil,
  Globe,
  Search,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "../../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { Badge } from "../../../../components/ui/badge";
import { Label } from "../../../../components/ui/label";
import Link from "next/link";
import { TextEditor } from "@/components/tip-tap-editor/text-editor";
import { useForm, Controller } from "react-hook-form";
import { FormValues } from "@/types/blog-form";
import { TBlog } from "@/types/blog";
import { useBlogs } from "@/hooks/use-allBlogs";

export default function Blogs() {
  // fetch all news blogs
  const { data: allBlogs = [], isLoading, error, refetch } = useBlogs();
  console.log("allBlogs:", allBlogs);

  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [uploadUrl, setUploadUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Filtered blogs
  const filteredBlogs = allBlogs.filter(
    (blog: TBlog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.primaryKeyword.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.author.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  // React Hook Form
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      title: "",
      image: "",
      author: "Admin",
      primaryKeyword: "",
      metaTitle: "",
      metaDescription: "",
      slug: "",
      content: "",
      status: "draft",
    },
  });

  const formValues = watch();

  // Auto-save function
  const handleAutoSave = useCallback(
    (content: string) => {
      localStorage.setItem(
        `blog-draft-${editingId || "new"}`,
        JSON.stringify({
          ...formValues,
          content,
          lastSaved: new Date().toISOString(),
        }),
      );
    },
    [formValues, editingId],
  );

  // Load draft from localStorage
  const loadDraft = useCallback(() => {
    const draftKey = `blog-draft-${editingId || "new"}`;
    const saved = localStorage.getItem(draftKey);
    if (saved) {
      const draft = JSON.parse(saved);
      reset(draft);
      setPreviewImage(draft.image);
      toast("Draft loaded", {
        description: "Your previously saved draft has been restored.",
      });
    }
  }, [editingId, reset]);

  // Image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Preview
    const preview = URL.createObjectURL(file);
    setPreviewImage(preview);

    // Upload to ImgBB
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
      { method: "POST", body: formData },
    );
    const data = await res.json();
    console.log("ImgBB response:", data);

    const imageUrl = data.data.url;

    setUploadUrl(imageUrl);
    setValue("image", imageUrl);
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const removeImage = () => {
    setPreviewImage(null);
    setUploadUrl(null);
    setValue("image", ""); // reset form value
  };
  // Submit blog post function
  const onSubmit = async (data: FormValues) => {
    console.log("blog blog data:", data);

    if (!data.title || !data.image || !data.content) {
      toast(
        `${data.title ? "" : "Title"} ${data.image ? "" : "Image"} ${data.content ? "" : "Content"} is required`,
        {
          description: "Please fill in all required fields",
        },
      );
      return;
    }

    try {
      if (editingId) {
        const res = await fetch(`/api/blogs/${editingId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...data,
            image: uploadUrl || data.image,
            publishDate: new Date().toISOString().split("T")[0],
          }),
        });
        if (res.ok) {
          refetch();
          setIsCreating(false);
          reset();
          localStorage.removeItem(`blog-draft-new`);
          toast("News blog updated successfully", {
            description: "The news blog has been updated.",
          });
        } else {
          toast("Failed to update news blog", {
            description: "An error occurred while updating the news blog.",
          });
        }
      } else {
        const res = await fetch("/api/blogs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...data,
            image: uploadUrl,
            publishDate: new Date().toISOString().split("T")[0],
          }),
        });
        if (res.ok) {
          refetch();
          reset();
          setIsCreating(false);
          localStorage.removeItem(`blog-draft-new`);
          toast("News blog created successfully", {
            description: "The news blog has been created.",
          });
        }
      }
    } catch (error: any) {
      toast("Failed to save news blog", { description: error.message });
    }
  };

  const handleEdit = (blog: TBlog) => {
    reset({
      title: blog?.title,
      image: blog?.image,
      author: blog?.author,
      primaryKeyword: blog?.primaryKeyword,
      metaTitle: blog?.metaTitle,
      metaDescription: blog?.metaDescription,
      slug: blog?.slug,
      content: blog?.content,
      status: blog?.status,
    });
    setPreviewImage(blog?.image);
    setEditingId(blog?._id);
    setIsCreating(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        refetch();
        toast("News blog deleted successfully");
      }
    } catch (error: any) {
      toast("Failed to delete news blog", { description: error.message });
    }
  };

  const resetForm = () => {
    reset();
    setIsCreating(false);
    setEditingId(null);
    setIsPreviewMode(false);
    localStorage.removeItem(`blog-draft-${editingId || "new"}`);
  };

  if (isLoading) return <p>Loading blogs...</p>; // show loading state
  if (error) return <p>Failed to load blogs</p>; // show error state

  return (
    <div className="bg-background">
      {/* Header */}
      <header className="sticky top-16 z-10 w-full border-b border-border bg-card">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/blogs">
            <Button size="sm" variant="outline" className="shadow-sm">
              <Eye className="h-4 w-4 mr-2" /> View News Page
            </Button>
          </Link>

          {/* Create Button */}
          <div className="flex gap-2">
            {/* Search Bar */}
            <div className="relative flex-1 md:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search blogs by title, keyword, or author..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm"
              />
            </div>
            <Button
              size="sm"
              onClick={() => {
                setIsCreating(true);
                setEditingId(null); // reset edit state
                reset(); // reset form values
                setPreviewImage(null); // clear preview image
                localStorage.removeItem("blog-draft-new"); // clear draft
              }}
              className="bg-accent text-white shadow-lg"
            >
              <Plus className="h-4 w-4 mr-2" /> New blog
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* blog Form */}
        {isCreating && (
          <Card className="pt-0 mb-8 border-0 shadow-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">
                      {editingId ? "Edit blog" : "Create New blog"}
                    </CardTitle>
                    <CardDescription>
                      {editingId
                        ? "Update the blog details below"
                        : "Fill in the details to create a new blog"}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsPreviewMode(!isPreviewMode)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    {isPreviewMode ? "Edit" : "Preview"}
                  </Button>
                  <Button variant="ghost" size="sm" onClick={loadDraft}>
                    <Clock className="h-4 w-4 mr-2" /> Load Draft
                  </Button>
                  <Button variant="ghost" size="sm" onClick={resetForm}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              {isPreviewMode ? (
                <div className="space-y-6">
                  <div className="text-center">
                    <h1 className="text-3xl font-bold mb-4">
                      {formValues.title || "blog Title"}
                    </h1>
                    <div className="max-w-2xl mx-auto h-64">
                      <img
                        src={previewImage || ""}
                        alt="blog image"
                        className="w-full h-full mb-4"
                      />
                    </div>
                    <p className="text-lg text-gray-600 my-4">
                      {formValues.primaryKeyword || "blog primary keyword"}
                    </p>
                    <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-8">
                      <span>By {"Admin"}</span>
                      <span>•</span>
                      <span>{new Date().toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div
                    className="prose prose-lg max-w-none dark:prose-invert"
                    dangerouslySetInnerHTML={{
                      __html:
                        formValues?.content ||
                        "<p>blog content will appear here...</p>",
                    }}
                  />
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                  {/* Basic Info */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="title"
                        className="text-sm font-medium flex items-center gap-2"
                      >
                        <FileText className="h-4 w-4" /> blog Title *
                      </Label>
                      <input
                        id="title"
                        {...register("title", { required: true })}
                        placeholder="Enter a compelling title..."
                        className="h-12 text-base border-2 focus:border-blue-600 rounded-md px-3 w-full placeholder:text-sm"
                      />
                      {errors.title && (
                        <p className="text-red-500 text-sm">
                          Title is required
                        </p>
                      )}
                    </div>
                    {/* author info and status */}
                    <div className="space-y-2">
                      <Label htmlFor="status" className="text-sm font-medium">
                        <User className="h-4 w-4" /> Author *
                      </Label>
                      <input
                        id="author"
                        {...register("author", { required: true })}
                        placeholder="Author Name..."
                        className="h-12 text-base border-2 focus:border-blue-600 rounded-md px-3 w-full placeholder:text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="status" className="text-sm font-medium">
                        <Globe className="h-4 w-4" /> Status
                      </Label>
                      <select
                        {...register("status")}
                        className="w-full h-12 px-3 border-2 border-gray-200 rounded-md focus:border-blue-500 dark:border-gray-600 dark:bg-gray-800"
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                      </select>
                    </div>
                  </div>

                  {/* primary keyword, meta title, meta description */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                    {/* primary keyword */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="primaryKeyword"
                        className="text-sm font-medium flex items-center gap-2"
                      >
                        <FileText className="h-4 w-4" /> Primary Keyword *
                      </Label>
                      <input
                        id="primaryKeyword"
                        {...register("primaryKeyword", { required: true })}
                        placeholder="Enter a catchy keyword..."
                        className="h-12 text-base border-2 focus:border-blue-600 rounded-md px-3 w-full placeholder:text-sm"
                      />
                    </div>
                    {/* meta title */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="metaTitle"
                        className="text-sm font-medium flex items-center gap-2"
                      >
                        <FileText className="h-4 w-4" /> Meta Title *
                      </Label>
                      <input
                        id="metaTitle"
                        {...register("metaTitle", { required: true })}
                        placeholder="Enter a catchy title..."
                        className="h-12 text-base border-2 focus:border-blue-600 rounded-md px-3 w-full placeholder:text-sm"
                      />
                    </div>
                    {/* meta description */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="metaDescription"
                        className="text-sm font-medium flex items-center gap-2"
                      >
                        <FileText className="h-4 w-4" /> Meta Description *
                      </Label>
                      <input
                        id="metaDescription"
                        {...register("metaDescription", { required: true })}
                        placeholder="Enter a catchy description..."
                        className="h-12 text-base border-2 focus:border-blue-600 rounded-md px-3 w-full placeholder:text-sm"
                      />
                    </div>
                  </div>
                  {/* Image upload, slug */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Image upload */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium flex items-center gap-2">
                        <Image className="h-4 w-4" /> Feature Image *
                      </Label>
                      <div>
                        <input
                          type="file"
                          accept="image/*"
                          ref={fileInputRef}
                          onChange={handleImageUpload}
                          className="hidden"
                        />

                        {!previewImage && (
                          <button
                            type="button"
                            className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-md px-3 py-3 hover:bg-gray-100 transition-colors"
                            onClick={openFileDialog}
                          >
                            <Image className="h-4 w-4" /> Upload Image
                          </button>
                        )}

                        {previewImage && (
                          <div
                            className="relative w-full h-96 rounded-md overflow-hidden cursor-pointer"
                            onClick={openFileDialog}
                          >
                            <img
                              src={previewImage}
                              alt="Preview"
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeImage();
                              }}
                              className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-gray-200 transition-colors"
                            >
                              <X className="h-4 w-4 text-gray-700" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    {/* Slug */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="slug"
                        className="text-sm font-medium flex items-center gap-2"
                      >
                        <FileText className="h-4 w-4" /> Slug *
                      </Label>
                      <input
                        id="slug"
                        {...register("slug", { required: true })}
                        placeholder="Enter a catchy slug..."
                        className="h-12 text-base border-2 focus:border-blue-600 rounded-md px-3 w-full placeholder:text-sm"
                      />
                    </div>
                  </div>

                  {/* Rich Text Editor */}
                  <div className="space-y-2 pt-6">
                    <Label className="text-sm font-medium">
                      <Pencil className="h-4 w-4" /> blog Content *
                    </Label>
                    <Controller
                      name="content"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <TextEditor
                          content={field.value}
                          onChange={field.onChange}
                          onAutoSave={handleAutoSave}
                          placeholder="Start writing your blog content here..."
                          showWordCount={true}
                        />
                      )}
                    />
                    {errors.content && (
                      <p className="text-red-500 text-sm">
                        Content is required
                      </p>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 pt-4">
                    <Button
                      variant="outline"
                      type="submit"
                      className="bg-primary text-primary-foreground shadow-lg px-8"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {editingId ? "Update blog" : "Create blog"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={resetForm}
                      className="bg-primary text-primary-foreground px-8"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        )}

        {/* blog List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Manage Your Blogs</h2>
            <div className="border rounded-full px-4 py-1 text-sm font-medium">
              {allBlogs?.length} Blog{allBlogs?.length !== 1 && "s"} Found
            </div>
          </div>

          <div className="grid gap-4">
            {filteredBlogs?.map((blog: any) => (
              <Card
                key={blog._id}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-lg font-semibold">{blog.title}</h3>
                        <Badge
                          variant={
                            blog.status === "published"
                              ? "default"
                              : "secondary"
                          }
                          className={`shadow-sm ${
                            blog.status === "published"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
                          }`}
                        >
                          {blog.status}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {blog.primaryKeyword}
                        </Badge>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                        {blog.excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" /> {blog.author}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(blog.publishDate).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-3 w-3" /> {blog.views || 0} views
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEdit(blog)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(blog._id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
