import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import {useQuery} from "@tanstack/react-query";
import {getDeviceUsage, getMetrics, getProductData, getRevenue} from "@/services/analyticsService.ts";
import { Loader } from "lucide-react";


const colorsPieChart = [
  { color: "hsl(245, 75%, 55%)" },
  { color: "hsl(265, 75%, 60%)" },
  { color: "hsl(285, 75%, 65%)" },
  { color: "hsl(240, 50%, 70%)" },
];

const formatted = (num) => {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(num / 100);
}


const Dashboard = () => {
  const { isLoading, data:lineChartData, error } = useQuery({
    queryKey: ['revenue'],
    queryFn: getRevenue,
  })
  const { isLoading:mLoading, data:metrics, error: mError} = useQuery({
    queryKey: ['metrics'],
    queryFn: getMetrics,
  })
  const { isLoading:dLoading, data:deviceUsage, error: dError} = useQuery({
    queryKey: ['device-usage'],
    queryFn: getDeviceUsage,
  })
  const { isLoading:pLoading, data:productData, error: pError} = useQuery({
    queryKey: ['product-data'],
    queryFn: getProductData,
  })

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your analytics overview</p>
      </div>

      <div className={`grid gap-6 ${mLoading ? 'grid-cols-1' : 'md:grid-cols-2 lg:grid-cols-3'}`}>
        {/* Revenue Card */}
        {mLoading ? (
            <div className="w-full flex justify-center">
              <Loader/>
            </div>
        ) : mError ? (
              <span className="text-sm text-destructive">
                Failed to load data
              </span>
        ):
            (
                <>
                  <Card className="bg-gradient-card shadow-card border-border">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
                      <div className="text-2xl font-bold text-foreground">${formatted(metrics[0].total_revenue)}</div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-muted-foreground">
                        <span className="text-primary font-medium">+{metrics[0].total_revenue_change}%</span> from last month
                      </p>
                    </CardContent>
                  </Card>

                  {/* Users Card */}
                  <Card className="bg-gradient-card shadow-card border-border">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Active Users</CardTitle>
                      <div className="text-2xl font-bold text-foreground">{formatted(metrics[0].active_users)}</div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-muted-foreground">
                        <span className="text-primary font-medium">+{metrics[0].active_users_change}%</span> from last month
                      </p>
                    </CardContent>
                  </Card>

                  {/* Sales Card */}
                  <Card className="bg-gradient-card shadow-card border-border">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Sales</CardTitle>
                      <div className="text-2xl font-bold text-foreground">{formatted(metrics[0].sales)}</div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-muted-foreground">
                        <span className="text-primary font-medium">+{metrics[0].sales_change}%</span> from last month
                      </p>
                    </CardContent>
                  </Card>
                </>
            )}
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
            <div className="h-80 flex items-center justify-center">
              {isLoading ? (
                  <div className="w-full flex justify-center items-center h-full"> <Loader/> </div>
              ) : error ? (
                  <span className="text-sm text-destructive">
                  Failed to load data
                </span>
              ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={lineChartData.map((e: {month:string, revenue: number}) => ({...e, name:e.month, value:e.revenue}))}>
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
              )}
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
                {dLoading ? (
                    <div className="w-full flex justify-center items-center h-full">
                      <Loader/>
                    </div>
                  ) : dError ? (
                        <span className="text-sm text-destructive">
                          Failed to load data
                        </span>
                    ):
                    (
                        <PieChart>
                          <Pie
                              data={deviceUsage.map((e) => ({...e,name:e.device, value:e.percentage}))}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={100}
                              paddingAngle={5}
                              dataKey="value"
                          >
                            {colorsPieChart.map((entry, index) => (
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
                    )
                }
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
              {   pLoading ? (  <div className="w-full flex justify-center items-center h-full"> <Loader/> </div>) :
                  pError ? ( <span className="text-sm text-destructive"> Failed to load data </span>) :
                  (
                    <BarChart data={productData.map((e) => ({...e,name:e.product}))}>
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
                  )
              }
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
