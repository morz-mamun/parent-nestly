/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useState, useEffect } from "react";
import { Plus, X, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Category {
  _id: string;
  name: string;
  subcategories: string[];
}

export function CategoryManager() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newSubcategories, setNewSubcategories] = useState<string[]>([]);
  const [newSubcategoryInput, setNewSubcategoryInput] = useState("");

  const [loading, setLoading] = useState(true);

  // ✅ Fetch categories
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/admin/categories");
      const data = await res.json();
      setCategories(data.data || []);
    } catch (error: any) {
      toast("Failed to load categories", { description: error.message });
    } finally {
      setLoading(false);
    }
  };

  // ✅ Add category
  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) {
      toast("Category name is required");
      return;
    }

    try {
      const res = await fetch("/api/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newCategoryName,
          subcategories: newSubcategories,
        }),
      });

      if (res.ok) {
        toast("Category added successfully");
        setNewCategoryName("");
        setNewSubcategories([]);
        setNewSubcategoryInput("");
        setIsOpen(false);
        fetchCategories();
      } else {
        const error = await res.json();
        toast("Failed to add category", { description: error.error });
      }
    } catch (error: any) {
      toast("Error adding category", { description: error.message });
    }
  };

  // ✅ Delete category by _id
  const handleDeleteCategory = async (categoryId: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;

    try {
      const res = await fetch(`/api/admin/categories/${categoryId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast("Category deleted successfully");
        fetchCategories();
      } else {
        const error = await res.json();
        toast("Failed to delete category", { description: error.error });
      }
    } catch (error: any) {
      toast("Error deleting category", { description: error.message });
    }
  };

  // ✅ Add subcategory
  const handleAddSubcategory = async (
    categoryId: string,
    subcategoryName: string,
  ) => {
    if (!subcategoryName.trim()) {
      toast("Subcategory name is required");
      return;
    }

    try {
      const res = await fetch(`/api/admin/categories/${categoryId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "add",
          subcategory: subcategoryName.toLowerCase().replace(/\s+/g, "-"),
        }),
      });

      if (res.ok) {
        toast("Subcategory added successfully");
        fetchCategories();
      } else {
        toast("Failed to add subcategory");
      }
    } catch (error: any) {
      toast("Error adding subcategory", { description: error.message });
    }
  };

  // ✅ Remove subcategory
  const handleRemoveSubcategory = async (
    categoryId: string,
    subcategoryName: string,
  ) => {
    try {
      const res = await fetch(`/api/admin/categories/${categoryId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "remove",
          subcategory: subcategoryName,
        }),
      });

      if (res.ok) {
        toast("Subcategory removed successfully");
        fetchCategories();
      } else {
        toast("Failed to remove subcategory");
      }
    } catch (error: any) {
      toast("Error removing subcategory", { description: error.message });
    }
  };

  if (loading) return <p>Loading categories...</p>;

  return (
    <div className="space-y-6">
      {/* Header + Add Button */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Manage Categories</h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-accent text-white">
              <Plus className="h-4 w-4 mr-2" /> New Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Category</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="category-name">Category Name</Label>
                <input
                  id="category-name"
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="e.g., Baby Care"
                  className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Subcategory Input */}
              <div>
                <Label htmlFor="subcategory-input">Add Subcategories</Label>
                <div className="flex gap-2 mt-2">
                  <input
                    id="subcategory-input"
                    type="text"
                    value={newSubcategoryInput}
                    onChange={(e) => setNewSubcategoryInput(e.target.value)}
                    placeholder="e.g., Sleep Training"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        setNewSubcategories([
                          ...newSubcategories,
                          newSubcategoryInput
                            .toLowerCase()
                            .replace(/\s+/g, "-"),
                        ]);
                        setNewSubcategoryInput("");
                      }
                    }}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  />
                  <Button
                    size="sm"
                    onClick={() => {
                      if (newSubcategoryInput.trim()) {
                        setNewSubcategories([
                          ...newSubcategories,
                          newSubcategoryInput
                            .toLowerCase()
                            .replace(/\s+/g, "-"),
                        ]);
                        setNewSubcategoryInput("");
                      }
                    }}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Display Added Subcategories */}
              {newSubcategories.length > 0 && (
                <div className="space-y-2">
                  <Label>Added Subcategories:</Label>
                  <div className="flex flex-wrap gap-2">
                    {newSubcategories.map((sub, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 bg-blue-100 px-3 py-1 rounded-full"
                      >
                        <span className="text-sm">{sub}</span>
                        <button
                          onClick={() =>
                            setNewSubcategories(
                              newSubcategories.filter((_, i) => i !== idx),
                            )
                          }
                          className="hover:text-red-600"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2 justify-end pt-4">
                <Button variant="outline" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleAddCategory}
                  className="bg-accent text-white"
                >
                  Add Category
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Category Cards */}
      <div className="grid gap-4">
        {categories.map((category) => (
          <Card key={category._id}>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{category.name}</CardTitle>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleDeleteCategory(category._id)}
                className="text-red-600 hover:text-red-800"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm mb-2 block">Subcategories:</Label>
                <div className="flex flex-wrap gap-2 mb-4">
                  {category.subcategories.map((subcategory) => (
                    <div
                      key={subcategory}
                      className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full"
                    >
                      <span className="text-sm">{subcategory}</span>
                      <button
                        onClick={() =>
                          handleRemoveSubcategory(category._id, subcategory)
                        }
                        className="hover:text-red-600"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add new subcategory to this category */}
                <div className="flex gap-2">
                  <input
                    id={`subcategory-${category._id}`}
                    type="text"
                    placeholder="Add new subcategory..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-sm"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        const input = e.currentTarget;
                        handleAddSubcategory(category._id, input.value);
                        input.value = "";
                      }
                    }}
                  />
                  <Button
                    size="sm"
                    onClick={() => {
                      const input = document.getElementById(
                        `subcategory-${category._id}`,
                      ) as HTMLInputElement;
                      if (input && input.value.trim()) {
                        handleAddSubcategory(category._id, input.value);
                        input.value = "";
                      }
                    }}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
