import { useData } from "@/context/DataContext";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

export const DataTable = () => {
  const { records } = useData();

  if (records.length === 0) {
    return (
      <div className="flex h-[300px] items-center justify-center rounded-xl border border-dashed border-border bg-muted/30">
        <p className="text-sm text-muted-foreground">
          No data available. Load preloaded data or add student records.
        </p>
      </div>
    );
  }

  const getMethodBadgeClass = (method: string) => {
    switch (method) {
      case "Offline":
        return "bg-offline/10 text-offline";
      case "Online":
        return "bg-online/10 text-online";
      case "Blended":
        return "bg-blended/10 text-blended";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden animate-fade-in">
      <ScrollArea className="h-[400px]">
        <Table>
          <TableHeader className="sticky top-0 bg-card z-10">
            <TableRow className="hover:bg-transparent">
              <TableHead className="font-semibold">Student Name</TableHead>
              <TableHead className="font-semibold">Marks</TableHead>
              <TableHead className="font-semibold">Method</TableHead>
              <TableHead className="font-semibold">Domain</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.map((record, index) => (
              <TableRow
                key={record.id}
                className="animate-fade-in"
                style={{ animationDelay: `${Math.min(index * 20, 200)}ms` }}
              >
                <TableCell className="font-medium">{record.name}</TableCell>
                <TableCell>
                  <span
                    className={cn(
                      "font-medium",
                      record.marks >= 80
                        ? "text-accent"
                        : record.marks >= 60
                        ? "text-foreground"
                        : "text-destructive"
                    )}
                  >
                    {record.marks}
                  </span>
                </TableCell>
                <TableCell>
                  <span
                    className={cn(
                      "inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium",
                      getMethodBadgeClass(record.method)
                    )}
                  >
                    {record.method}
                  </span>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {record.domain}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
};
