"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const iconCategories = {
  "Learning": ["📚", "🎓", "📖", "✏️", "📝", "🧠", "💡", "🔬", "📊", "📈"],
  "Health": ["🏥", "💊", "🩺", "❤️", "🧘", "🏃", "💪", "🥗", "🌱", "⚕️"],
  "Business": ["💼", "📊", "💰", "📈", "🏢", "💳", "📋", "🎯", "📞", "💻"],
  "Technology": ["💻", "📱", "⚙️", "🔧", "🖥️", "📡", "🔌", "💾", "🖨️", "📺"],
  "Creative": ["🎨", "🖌️", "📷", "🎭", "🎵", "🎬", "✨", "🌈", "🎪", "🎨"],
  "Travel": ["✈️", "🌍", "🗺️", "🧳", "🏖️", "🏔️", "🚗", "🚢", "🎒", "📍"],
  "Food": ["🍕", "🍔", "🥗", "🍎", "🥑", "🍳", "☕", "🍰", "🥘", "🍜"],
  "Sports": ["⚽", "🏀", "🎾", "🏈", "⚾", "🏐", "🏓", "🥊", "🏊", "🚴"],
  "Nature": ["🌳", "🌸", "🌺", "🍃", "🌿", "🌱", "🌊", "⛰️", "🌙", "☀️"],
  "Objects": ["📦", "🔑", "🎁", "📌", "📎", "🔒", "🛠️", "📏", "📐", "🔍"]
};

interface IconPickerProps {
  value: string;
  onChange: (icon: string) => void;
}

export default function IconPicker({ value, onChange }: IconPickerProps) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Learning");

  const filteredIcons = search 
    ? Object.values(iconCategories).flat().filter(icon => 
        icon.includes(search) || 
        Object.entries(iconCategories).some(([category, icons]) => 
          icons.includes(icon) && category.toLowerCase().includes(search.toLowerCase())
        )
      )
    : iconCategories[selectedCategory as keyof typeof iconCategories];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          <span className="text-lg mr-2">{value || "📚"}</span>
          Choose Icon
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search icons..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        {!search && (
          <div className="flex flex-wrap gap-1 p-2 border-b">
            {Object.keys(iconCategories).map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="text-xs"
              >
                {category}
              </Button>
            ))}
          </div>
        )}
        
        <div className="p-4 max-h-64 overflow-y-auto">
          <div className="grid grid-cols-8 gap-2">
            {filteredIcons.map((icon, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                className="h-10 w-10 p-0 text-lg hover:bg-accent"
                onClick={() => onChange(icon)}
              >
                {icon}
              </Button>
            ))}
          </div>
          {filteredIcons.length === 0 && (
            <p className="text-center text-muted-foreground py-4">
              No icons found
            </p>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}