import { useState } from 'react';
import { Plus, Pencil, Trash2, Search, Filter } from 'lucide-react';
import { AdminHeader } from '../components/AdminHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { mockProducts } from '../data/mockData';
import { AdminProduct } from '../types';
import { toast } from 'sonner';
import { ImageUpload, MultiImageUpload } from '../components/ImageUpload';

export function AdminProducts() {
  const [products, setProducts] = useState<AdminProduct[]>(mockProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    category: 'cakes' as 'cakes' | 'decoration',
    subcategory: '',
    price: '',
    description: '',
    tags: '',
    sku: '',
    stock: '',
    available: true,
    popular: false,
    pricePerLb: false,
    sizes: '',
    occasions: [] as string[],
    image: '',
    galleryImages: [] as string[],
  });

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const resetForm = () => {
    setFormData({
      name: '',
      category: 'cakes',
      subcategory: '',
      price: '',
      description: '',
      tags: '',
      sku: '',
      stock: '',
      available: true,
      popular: false,
      pricePerLb: false,
      sizes: '',
      occasions: [],
      image: '',
      galleryImages: [],
    });
    setEditingProduct(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const galleryImagesArray = formData.galleryImages.length > 0 
      ? formData.galleryImages
      : undefined;
    
    if (editingProduct) {
      // Update existing product
      setProducts(products.map(p => 
        p.id === editingProduct.id 
          ? { 
              ...p, 
              ...formData,
              price: parseFloat(formData.price),
              stock: parseInt(formData.stock) || 0,
              tags: formData.tags.split(',').map(t => t.trim()),
              sizes: formData.sizes ? formData.sizes.split(',').map(s => parseFloat(s.trim())) : undefined,
              image: formData.image || p.image,
              galleryImages: galleryImagesArray,
              updatedAt: new Date(),
            } 
          : p
      ));
      toast.success('Product updated successfully');
    } else {
      // Add new product
      const newProduct: AdminProduct = {
        id: Date.now().toString(),
        name: formData.name,
        category: formData.category,
        subcategory: formData.subcategory || undefined,
        occasion: formData.occasions,
        price: parseFloat(formData.price),
        pricePerLb: formData.pricePerLb,
        image: formData.image || '/placeholder.svg',
        galleryImages: galleryImagesArray,
        description: formData.description,
        tags: formData.tags.split(',').map(t => t.trim()),
        available: formData.available,
        popular: formData.popular,
        sizes: formData.sizes ? formData.sizes.split(',').map(s => parseFloat(s.trim())) : undefined,
        sku: formData.sku,
        stock: parseInt(formData.stock) || 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setProducts([...products, newProduct]);
      toast.success('Product added successfully');
    }
    
    setIsAddDialogOpen(false);
    resetForm();
  };

  const handleEdit = (product: AdminProduct) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      subcategory: product.subcategory || '',
      price: product.price.toString(),
      description: product.description,
      tags: product.tags.join(', '),
      sku: product.sku || '',
      stock: product.stock?.toString() || '',
      available: product.available,
      popular: product.popular || false,
      pricePerLb: product.pricePerLb || false,
      sizes: product.sizes?.join(', ') || '',
      occasions: product.occasion,
      image: product.image || '',
      galleryImages: product.galleryImages || [],
    });
    setIsAddDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
    toast.success('Product deleted successfully');
  };

  return (
    <div className="min-h-screen">
      <AdminHeader title="Products" />
      
      <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
        {/* Toolbar */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col sm:flex-row gap-3 flex-1">
            <div className="relative flex-1 sm:max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[150px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="cakes">Cakes</SelectItem>
                <SelectItem value="decoration">Decorations</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={(open) => {
            setIsAddDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button className="w-full sm:w-auto">
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto mx-4">
              <DialogHeader>
                <DialogTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
                <DialogDescription>
                  {editingProduct ? 'Update product details' : 'Fill in the product details below'}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Product Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sku">SKU</Label>
                    <Input
                      id="sku"
                      value={formData.sku}
                      onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                      placeholder="CAKE-001"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select 
                      value={formData.category} 
                      onValueChange={(v: 'cakes' | 'decoration') => setFormData({ ...formData, category: v })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cakes">Cakes</SelectItem>
                        <SelectItem value="decoration">Decorations</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subcategory">Subcategory</Label>
                    <Input
                      id="subcategory"
                      value={formData.subcategory}
                      onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                      placeholder="vanilla, chocolate..."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (Rs) *</Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stock">Stock</Label>
                    <Input
                      id="stock"
                      type="number"
                      value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    />
                  </div>
                </div>

                {formData.category === 'cakes' && (
                  <div className="space-y-2">
                    <Label htmlFor="sizes">Sizes (lb, comma-separated)</Label>
                    <Input
                      id="sizes"
                      value={formData.sizes}
                      onChange={(e) => setFormData({ ...formData, sizes: e.target.value })}
                      placeholder="1, 2, 3, 5"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input
                    id="tags"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    placeholder="eggless, premium, bestseller"
                  />
                </div>

                <ImageUpload
                  label="Thumbnail Image *"
                  value={formData.image}
                  onChange={(value) => setFormData({ ...formData, image: value })}
                />

                <MultiImageUpload
                  label="Sample/Gallery Images"
                  values={formData.galleryImages}
                  onChange={(values) => setFormData({ ...formData, galleryImages: values })}
                  maxImages={6}
                />

                <div className="flex flex-wrap gap-4 lg:gap-6">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="available"
                      checked={formData.available}
                      onCheckedChange={(checked) => setFormData({ ...formData, available: checked })}
                    />
                    <Label htmlFor="available">Available</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="popular"
                      checked={formData.popular}
                      onCheckedChange={(checked) => setFormData({ ...formData, popular: checked })}
                    />
                    <Label htmlFor="popular">Popular</Label>
                  </div>
                  {formData.category === 'cakes' && (
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="pricePerLb"
                        checked={formData.pricePerLb}
                        onCheckedChange={(checked) => setFormData({ ...formData, pricePerLb: checked })}
                      />
                      <Label htmlFor="pricePerLb">Price per lb</Label>
                    </div>
                  )}
                </div>

                <DialogFooter className="flex-col sm:flex-row gap-2">
                  <Button type="button" variant="outline" onClick={() => {
                    setIsAddDialogOpen(false);
                    resetForm();
                  }}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingProduct ? 'Update Product' : 'Add Product'}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Products - Mobile Cards */}
        <div className="lg:hidden space-y-3">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-20 w-20 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-medium truncate">{product.name}</p>
                      <Badge variant={product.available ? 'default' : 'secondary'} className="shrink-0">
                        {product.available ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground capitalize">{product.category}</p>
                    <p className="font-semibold mt-1">
                      Rs {product.price}
                      {product.pricePerLb && <span className="text-muted-foreground font-normal">/lb</span>}
                    </p>
                    <div className="flex gap-1 mt-2">
                      {product.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 mt-3 pt-3 border-t">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleEdit(product)}
                  >
                    <Pencil className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                    onClick={() => handleDelete(product.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Products Table - Desktop */}
        <Card className="hidden lg:block">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-12 w-12 rounded-lg object-cover"
                        />
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <div className="flex gap-1 mt-1">
                            {product.tags.slice(0, 2).map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{product.sku || '-'}</TableCell>
                    <TableCell className="capitalize">{product.category}</TableCell>
                    <TableCell>
                      Rs {product.price}
                      {product.pricePerLb && <span className="text-muted-foreground">/lb</span>}
                    </TableCell>
                    <TableCell>{product.stock ?? '-'}</TableCell>
                    <TableCell>
                      <Badge variant={product.available ? 'default' : 'secondary'}>
                        {product.available ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(product)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive"
                          onClick={() => handleDelete(product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
