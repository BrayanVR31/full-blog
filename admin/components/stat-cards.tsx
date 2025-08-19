import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface Props {
  total: number;
  title: string;
  filteredTotal: number;
  searchKeyword: string;
}

export default function StatCards({
  total = 0,
  title,
  filteredTotal = 0,
  searchKeyword,
}: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">{total}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Active Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">
            {searchKeyword ? filteredTotal : "All"}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">
            {total > 0 ? "Active" : "None"}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
