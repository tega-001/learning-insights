import { useState } from "react";
import { useData } from "@/context/DataContext";
import { TeachingMethod, teachingMethods } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { UserPlus } from "lucide-react";

export const StudentForm = () => {
  const { addRecord, selectedDomain } = useData();
  const [name, setName] = useState("");
  const [marks, setMarks] = useState("");
  const [method, setMethod] = useState<TeachingMethod | "">("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Please enter a student name");
      return;
    }

    const marksNum = parseInt(marks);
    if (isNaN(marksNum) || marksNum < 0 || marksNum > 100) {
      toast.error("Please enter valid marks (0-100)");
      return;
    }

    if (!method) {
      toast.error("Please select a teaching method");
      return;
    }

    if (!selectedDomain) {
      toast.error("Please select a domain first");
      return;
    }

    addRecord({
      name: name.trim(),
      marks: marksNum,
      method,
      domain: selectedDomain,
    });

    toast.success("Student record added successfully");
    setName("");
    setMarks("");
    setMethod("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Student Name</Label>
          <Input
            id="name"
            placeholder="Enter student name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="marks">Marks (0-100)</Label>
          <Input
            id="marks"
            type="number"
            min={0}
            max={100}
            placeholder="Enter marks"
            value={marks}
            onChange={(e) => setMarks(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="method">Teaching Method</Label>
        <Select value={method} onValueChange={(value) => setMethod(value as TeachingMethod)}>
          <SelectTrigger id="method">
            <SelectValue placeholder="Select teaching method" />
          </SelectTrigger>
          <SelectContent className="bg-card">
            {teachingMethods.map((m) => (
              <SelectItem key={m} value={m}>
                {m}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span>Domain:</span>
        <span className="font-medium text-foreground">
          {selectedDomain || "Not selected"}
        </span>
      </div>

      <Button type="submit" className="w-full" disabled={!selectedDomain}>
        <UserPlus className="mr-2 h-4 w-4" />
        Add Student Record
      </Button>
    </form>
  );
};
