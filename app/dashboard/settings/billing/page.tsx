// app/dashboard/settings/billing/page.tsx

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  CreditCard,
  Calendar,
  Download,
  Clock,
  Activity,
  CheckCircle,
  AlertCircle,
  ArrowUpRight,
  ArrowLeft,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

// We define interfaces for type safety throughout our billing page
interface BillingPlan {
  id: string;
  name: string;
  price: number;
  interval: "monthly" | "yearly";
  features: string[];
  limits: {
    subscribers: number;
    emailsPerMonth: number;
    customDomains: number;
  };
}

interface UsageMetrics {
  subscribers: {
    current: number;
    limit: number;
  };
  emailsSent: {
    current: number;
    limit: number;
  };
  domainsUsed: {
    current: number;
    limit: number;
  };
}

interface PaymentMethod {
  id: string;
  type: "card" | "paypal";
  last4?: string;
  expiryDate?: string;
  brand?: string;
  isDefault: boolean;
}

interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: "paid" | "pending" | "failed";
  downloadUrl: string;
}

export default function BillingSettings() {
  const router = useRouter();

  // State management for our billing information
  const [currentPlan] = useState<string>("pro");
  const [billingInterval, setBillingInterval] = useState<"monthly" | "yearly">(
    "monthly"
  );

  // Example usage metrics - would come from your API
  const usageMetrics: UsageMetrics = {
    subscribers: {
      current: 1850,
      limit: 2500,
    },
    emailsSent: {
      current: 15000,
      limit: 25000,
    },
    domainsUsed: {
      current: 1,
      limit: 3,
    },
  };

  // Example billing plans - would come from your pricing configuration
  const plans: BillingPlan[] = [
    {
      id: "hobby",
      name: "Hobby",
      price: 0,
      interval: "monthly",
      features: [
        "Up to 100 subscribers",
        "500 emails/month",
        "Basic analytics",
        "Bluesletter subdomain",
      ],
      limits: {
        subscribers: 100,
        emailsPerMonth: 500,
        customDomains: 0,
      },
    },
    {
      id: "pro",
      name: "Pro",
      price: billingInterval === "monthly" ? 15 : 150,
      interval: billingInterval,
      features: [
        "Up to 2,500 subscribers",
        "25,000 emails/month",
        "Advanced analytics",
        "Custom domain",
        "Remove Bluesletter branding",
      ],
      limits: {
        subscribers: 2500,
        emailsPerMonth: 25000,
        customDomains: 1,
      },
    },
    {
      id: "business",
      name: "Business",
      price: billingInterval === "monthly" ? 49 : 490,
      interval: billingInterval,
      features: [
        "Up to 10,000 subscribers",
        "100,000 emails/month",
        "Premium analytics",
        "Priority support",
        "Team members",
      ],
      limits: {
        subscribers: 10000,
        emailsPerMonth: 100000,
        customDomains: 3,
      },
    },
  ];

  // Example payment methods - would come from your payment processor
  const paymentMethods: PaymentMethod[] = [
    {
      id: "1",
      type: "card",
      last4: "4242",
      expiryDate: "12/24",
      brand: "Visa",
      isDefault: true,
    },
    {
      id: "2",
      type: "paypal",
      isDefault: false,
    },
  ];

  // Example invoices - would come from your billing system
  const invoices: Invoice[] = [
    {
      id: "INV-001",
      date: "2024-02-01",
      amount: 15.0,
      status: "paid",
      downloadUrl: "#",
    },
    {
      id: "INV-002",
      date: "2024-01-01",
      amount: 15.0,
      status: "paid",
      downloadUrl: "#",
    },
  ];

  // Calculate the percentage for progress bars
  const calculateUsagePercentage = (current: number, limit: number): number => {
    return Math.min(Math.round((current / limit) * 100), 100);
  };

  // Format currency amounts consistently
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  // Format large numbers with commas
  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat("en-US").format(num);
  };

  return (
    <div className='flex flex-col gap-6 p-6'>
      {/* Page Header - Outside of any card */}
      <div className='flex items-center gap-4 mb-4'>
        <Button
          variant='ghost'
          size='icon'
          onClick={() => router.push("/dashboard/settings")}
        >
          <ArrowLeft className='w-4 h-4' />
        </Button>
        <div>
          <h1 className='font-semibold text-2xl tracking-tight'>
            Billing & Plans
          </h1>
          <p className='text-muted-foreground'>
            Manage your subscription and billing information
          </p>
        </div>
      </div>

      {/* Main cards grid - 3 columns for larger screens */}
      <div className='gap-6 grid grid-cols-1 md:grid-cols-3'>
        {/* Current Plan & Usage */}
        <Card className='md:col-span-1'>
          <CardHeader>
            <CardTitle>Usage & Limits</CardTitle>
            <CardDescription>
              Current usage across your subscription
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            {/* Usage metrics */}
            <div className='space-y-4'>
              <div className='space-y-2'>
                <div className='flex justify-between text-sm'>
                  <span>Subscribers</span>
                  <span>
                    {formatNumber(usageMetrics.subscribers.current)} /{" "}
                    {formatNumber(usageMetrics.subscribers.limit)}
                  </span>
                </div>
                <Progress
                  value={calculateUsagePercentage(
                    usageMetrics.subscribers.current,
                    usageMetrics.subscribers.limit
                  )}
                />
              </div>

              <div className='space-y-2'>
                <div className='flex justify-between text-sm'>
                  <span>Emails Sent</span>
                  <span>
                    {formatNumber(usageMetrics.emailsSent.current)} /{" "}
                    {formatNumber(usageMetrics.emailsSent.limit)}
                  </span>
                </div>
                <Progress
                  value={calculateUsagePercentage(
                    usageMetrics.emailsSent.current,
                    usageMetrics.emailsSent.limit
                  )}
                />
              </div>

              <div className='space-y-2'>
                <div className='flex justify-between text-sm'>
                  <span>Custom Domains</span>
                  <span>
                    {usageMetrics.domainsUsed.current} /{" "}
                    {usageMetrics.domainsUsed.limit}
                  </span>
                </div>
                <Progress
                  value={calculateUsagePercentage(
                    usageMetrics.domainsUsed.current,
                    usageMetrics.domainsUsed.limit
                  )}
                />
              </div>
            </div>

            <div className='bg-muted/50 p-4 border rounded-lg'>
              <div className='flex items-center gap-4'>
                <Activity className='w-5 h-5 text-primary' />
                <div className='flex-1'>
                  <p className='font-medium text-sm'>Need more resources?</p>
                  <p className='text-muted-foreground text-sm'>
                    Upgrade to the Business plan for increased limits and
                    additional features.
                  </p>
                </div>
                <Button>Upgrade Plan</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card className='md:col-span-1'>
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
            <CardDescription>
              Manage your payment methods and billing information
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className='flex justify-between items-center p-4 border rounded-lg'
              >
                <div className='flex items-center gap-4'>
                  {method.type === "card" ? (
                    <CreditCard className='w-5 h-5' />
                  ) : (
                    <div className='w-5 h-5 text-[#00457C]'>
                      {/* PayPal icon would go here */}P
                    </div>
                  )}
                  <div>
                    {method.type === "card" ? (
                      <p className='font-medium'>
                        {method.brand} •••• {method.last4}
                      </p>
                    ) : (
                      <p className='font-medium'>PayPal Account</p>
                    )}
                    {method.type === "card" && (
                      <p className='text-muted-foreground text-sm'>
                        Expires {method.expiryDate}
                      </p>
                    )}
                  </div>
                </div>
                <div className='flex items-center gap-2'>
                  {method.isDefault && <Badge variant='outline'>Default</Badge>}
                  <Button variant='ghost' size='sm'>
                    Edit
                  </Button>
                  {!method.isDefault && (
                    <Button variant='ghost' size='sm'>
                      Remove
                    </Button>
                  )}
                </div>
              </div>
            ))}
            <Button variant='outline' className='w-full'>
              <CreditCard className='mr-2 w-4 h-4' />
              Add Payment Method
            </Button>
          </CardContent>
        </Card>

        {/* Billing History */}
        <Card className='md:col-span-1'>
          <CardHeader>
            <CardTitle>Billing History</CardTitle>
            <CardDescription>
              View and download your past invoices
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className='text-right'>Download</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell>
                      {new Date(invoice.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{invoice.id}</TableCell>
                    <TableCell>{formatCurrency(invoice.amount)}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          invoice.status === "paid" ? "outline" : "destructive"
                        }
                      >
                        {invoice.status.charAt(0).toUpperCase() +
                          invoice.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className='text-right'>
                      <Button variant='ghost' size='icon' asChild>
                        <a href={invoice.downloadUrl} download>
                          <Download className='w-4 h-4' />
                        </a>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Available Plans section with side-by-side header */}
      <Card>
        <div className='flex sm:flex-row flex-col sm:justify-between sm:items-center p-6 border-b'>
          <div>
            <h2 className='font-semibold text-lg leading-none'>
              Available Plans
            </h2>
            <p className='mt-1 text-muted-foreground text-sm'>
              Choose the plan that best fits your needs
            </p>
          </div>
          <div className='mt-4 sm:mt-0'>
            <Select
              value={billingInterval}
              onValueChange={(value: "monthly" | "yearly") =>
                setBillingInterval(value)
              }
            >
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='Select billing interval' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='monthly'>Bill Monthly</SelectItem>
                <SelectItem value='yearly'>Bill Yearly (Save 20%)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <CardContent className='pt-6'>
          <div className='gap-4 grid md:grid-cols-3'>
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={cn(
                  "relative",
                  currentPlan === plan.id && "border-primary"
                )}
              >
                {currentPlan === plan.id && (
                  <div className='-top-3 left-1/2 absolute -translate-x-1/2'>
                    <Badge>Current Plan</Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>
                    <span className='font-bold text-2xl'>
                      {formatCurrency(plan.price)}
                    </span>
                    /{plan.interval}
                  </CardDescription>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <ul className='space-y-2 text-sm'>
                    {plan.features.map((feature, index) => (
                      <li key={index} className='flex items-center gap-2'>
                        <CheckCircle className='w-4 h-4 text-primary' />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className='w-full'
                    variant={currentPlan === plan.id ? "outline" : "default"}
                  >
                    {currentPlan === plan.id ? "Current Plan" : "Select Plan"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Enterprise Plan Call-to-Action */}
      <div className='border-2 border-primary/20 bg-primary/5 p-6 rounded-lg'>
        <div className='flex md:flex-row flex-col justify-between items-center gap-6'>
          <div className='space-y-2'>
            <h3 className='font-semibold text-lg'>Need a Custom Solution?</h3>
            <p className='text-muted-foreground'>
              Get in touch to learn about our enterprise plans with custom
              limits, dedicated support, and additional features tailored to
              your needs.
            </p>
          </div>
          <Button className='min-w-[200px]' size='lg'>
            Contact Sales
            <ArrowUpRight className='ml-2 w-4 h-4' />
          </Button>
        </div>
      </div>

      {/* Plan Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Plan Comparison</CardTitle>
          <CardDescription>
            Detailed comparison of available plans and features
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Feature</TableHead>
                <TableHead>Hobby</TableHead>
                <TableHead>Pro</TableHead>
                <TableHead>Business</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className='font-medium'>Subscriber Limit</TableCell>
                <TableCell>100</TableCell>
                <TableCell>2,500</TableCell>
                <TableCell>10,000</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className='font-medium'>
                  Monthly Email Limit
                </TableCell>
                <TableCell>500</TableCell>
                <TableCell>25,000</TableCell>
                <TableCell>100,000</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className='font-medium'>Custom Domains</TableCell>
                <TableCell>
                  <Badge variant='outline' className='bg-destructive/10'>
                    Not Available
                  </Badge>
                </TableCell>
                <TableCell>1 domain</TableCell>
                <TableCell>3 domains</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className='font-medium'>Analytics</TableCell>
                <TableCell>Basic</TableCell>
                <TableCell>Advanced</TableCell>
                <TableCell>Premium</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className='font-medium'>Support Level</TableCell>
                <TableCell>Community</TableCell>
                <TableCell>Standard</TableCell>
                <TableCell>Priority</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className='font-medium'>Team Members</TableCell>
                <TableCell>1</TableCell>
                <TableCell>3</TableCell>
                <TableCell>Unlimited</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Subscription Management */}
      <Card>
        <CardHeader>
          <CardTitle>Subscription Management</CardTitle>
          <CardDescription>
            Manage your subscription settings and billing cycle
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-6'>
          {/* Next Billing Date */}
          <div className='flex justify-between items-center bg-muted/50 p-4 border rounded-lg'>
            <div className='flex items-center gap-4'>
              <Calendar className='w-5 h-5 text-primary' />
              <div>
                <p className='font-medium'>Next Billing Date</p>
                <p className='text-muted-foreground text-sm'>
                  Your next billing date is March 1, 2024
                </p>
              </div>
            </div>
            <Button variant='outline'>Change Billing Cycle</Button>
          </div>

          {/* Auto-Renewal Setting */}
          <div className='flex justify-between items-center p-4 border rounded-lg'>
            <div className='flex items-center gap-4'>
              <Clock className='w-5 h-5 text-primary' />
              <div>
                <p className='font-medium'>Auto-Renewal</p>
                <p className='text-muted-foreground text-sm'>
                  Your subscription will automatically renew each period
                </p>
              </div>
            </div>
            <Button variant='outline'>Manage Auto-Renewal</Button>
          </div>

          {/* Usage Alerts */}
          <div className='flex justify-between items-center p-4 border rounded-lg'>
            <div className='flex items-center gap-4'>
              <AlertCircle className='w-5 h-5 text-primary' />
              <div>
                <p className='font-medium'>Usage Alerts</p>
                <p className='text-muted-foreground text-sm'>
                  Get notified when you reach 80% of your plan limits
                </p>
              </div>
            </div>
            <Button variant='outline'>Configure Alerts</Button>
          </div>

          {/* Cancel Subscription */}
          <div className='border-destructive/50 p-4 border rounded-lg'>
            <div className='flex md:flex-row flex-col justify-between items-center gap-4'>
              <div>
                <p className='font-medium text-destructive'>
                  Cancel Subscription
                </p>
                <p className='text-muted-foreground text-sm'>
                  Your subscription will remain active until the end of the
                  current billing period
                </p>
              </div>
              <Button variant='destructive'>Cancel Subscription</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Consumption Warning */}
      {(usageMetrics.subscribers.current / usageMetrics.subscribers.limit >
        0.8 ||
        usageMetrics.emailsSent.current / usageMetrics.emailsSent.limit >
          0.8) && (
        <div className='border-2 border-warning bg-warning/10 p-4 rounded-lg'>
          <div className='flex items-start gap-4'>
            <AlertCircle className='mt-0.5 w-5 h-5 text-warning' />
            <div className='space-y-1'>
              <p className='font-medium'>Approaching Plan Limits</p>
              <p className='text-muted-foreground text-sm'>
                You&apos;re close to reaching your plan limits. Consider
                upgrading to avoid any service interruptions.
              </p>
              <Button variant='outline' size='sm' className='mt-2'>
                Review Usage
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
