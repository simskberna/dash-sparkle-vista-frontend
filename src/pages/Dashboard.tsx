import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const lineChartData = [
  { name: "Jan", value: 400, growth: 240 },
  { name: "Feb", value: 300, growth: 139 },
  { name: "Mar", value: 200, growth: 980 },
  { name: "Apr", value: 278, growth: 390 },
  { name: "May", value: 189, growth: 480 },
  { name: "Jun", value: 239, growth: 380 },
];

const barChartData = [
  { name: "Product A", sales: 4000, revenue: 2400 },
  { name: "Product B", sales: 3000, revenue: 1398 },
  { name: "Product C", sales: 2000, revenue: 9800 },
  { name: "Product D", sales: 2780, revenue: 3908 },
  { name: "Product E", sales: 1890, revenue: 4800 },
];

const pieChartData = [
  { name: "Desktop", value: 400, color: "hsl(245, 75%, 55%)" },
  { name: "Mobile", value: 300, color: "hsl(265, 75%, 60%)" },
  { name: "Tablet", value: 300, color: "hsl(285, 75%, 65%)" },
  { name: "Other", value: 200, color: "hsl(240, 50%, 70%)" },
];

const Dashboard = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your analytics overview</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Revenue Card */}
        <Card className="bg-gradient-card shadow-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
            <div className="text-2xl font-bold text-foreground">$45,231.89</div>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              <span className="text-primary font-medium">+20.1%</span> from last month
            </p>
          </CardContent>
        </Card>

        {/* Users Card */}
        <Card className="bg-gradient-card shadow-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Users</CardTitle>
            <div className="text-2xl font-bold text-foreground">2,350</div>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              <span className="text-primary font-medium">+180.1%</span> from last month
            </p>
          </CardContent>
        </Card>

        {/* Sales Card */}
        <Card className="bg-gradient-card shadow-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Sales</CardTitle>
            <div className="text-2xl font-bold text-foreground">12,234</div>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              <span className="text-primary font-medium">+19%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Line Chart */}
        <Card className="col-span-full lg:col-span-2 bg-gradient-card shadow-elevated border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Revenue Overview</CardTitle>
            <CardDescription className="text-muted-foreground">
              Monthly revenue and growth comparison
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="name" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--primary))", strokeWidth: 2 }}
                    name="Revenue"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="growth" 
                    stroke="hsl(var(--primary-glow))" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="Growth"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card className="bg-gradient-card shadow-elevated border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Device Usage</CardTitle>
            <CardDescription className="text-muted-foreground">
              Traffic by device type
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bar Chart */}
      <Card className="bg-gradient-card shadow-elevated border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Product Performance</CardTitle>
          <CardDescription className="text-muted-foreground">
            Sales and revenue by product category
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="name" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Legend />
                <Bar 
                  dataKey="sales" 
                  fill="hsl(var(--primary))" 
                  radius={[4, 4, 0, 0]}
                  name="Sales"
                />
                <Bar 
                  dataKey="revenue" 
                  fill="hsl(var(--primary-glow))" 
                  radius={[4, 4, 0, 0]}
                  name="Revenue"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;