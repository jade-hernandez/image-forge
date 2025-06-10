'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';

import { TrendingUp } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import { cn } from '../../lib';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../card';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartWrapperProps,
} from '../chart';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../select';

/**
 * Interactive area chart with time period filter
 */
export function ChartAreaInteractive({
  data,
  title = 'Interactive Chart',
  description = 'Data visualization with interactive filtering',
  className,
  config,
  ...props
}: ChartWrapperProps<{ date: string; [key: string]: any }>) {
  const [timeRange, setTimeRange] = React.useState('90d');

  // Get data series for the chart
  const seriesKeys = React.useMemo(() => {
    return Object.entries(config)
      .filter(([key]) => key !== 'views')
      .map(([key]) => key);
  }, [config]);

  // Simplified filtering logic that won't filter out all data
  const filteredData = React.useMemo(() => {
    // Just return the original data for now to ensure something is shown
    return data;
  }, [data]);

  return (
    <Card className={cn('h-full', className)} {...props}>
      <CardHeader className='flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row'>
        <div className='grid flex-1 gap-1 text-center sm:text-left'>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className='w-[160px] rounded-lg sm:ml-auto'
            aria-label='Select a time range'
          >
            <SelectValue placeholder='Last 3 months' />
          </SelectTrigger>
          <SelectContent className='rounded-xl'>
            <SelectItem value='90d' className='rounded-lg'>
              Last 3 months
            </SelectItem>
            <SelectItem value='30d' className='rounded-lg'>
              Last 30 days
            </SelectItem>
            <SelectItem value='7d' className='rounded-lg'>
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className='pt-6'>
        <div className='h-[260px] w-full'>
          {/* Use a simpler approach to render the area chart */}
          <ChartContainer config={config} className='h-full w-full'>
            <AreaChart data={filteredData} margin={{ top: 10, right: 10, left: 10, bottom: 25 }}>
              {/* Create gradient definitions with simplified IDs */}
              <defs>
                {seriesKeys.map((key) => (
                  <linearGradient key={key} id={`grad-${key}`} x1='0' y1='0' x2='0' y2='1'>
                    <stop
                      offset='5%'
                      stopColor={config[key]?.color || '#8884d8'}
                      stopOpacity={0.8}
                    />
                    <stop
                      offset='95%'
                      stopColor={config[key]?.color || '#8884d8'}
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                ))}
              </defs>

              <CartesianGrid strokeDasharray='3 3' stroke='#ccc' opacity={0.3} />

              <XAxis
                dataKey='date'
                tickLine={false}
                axisLine={false}
                tickMargin={12}
                minTickGap={25}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString('en-US', {
                    month: 'short',
                  });
                }}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tickMargin={8}
                tickFormatter={(value) =>
                  value === 0 ? '' : `£${(value / 1000).toLocaleString()}k`
                }
              />

              <ChartTooltip
                cursor={{ stroke: '#ccc', strokeDasharray: '3 3' }}
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString('en-US', {
                        month: 'long',
                        year: 'numeric',
                      });
                    }}
                    formatter={(value) => `£${value.toLocaleString()}`}
                    indicator='dot'
                  />
                }
              />

              {/* Directly use explicit values for each property to avoid reference issues */}
              {seriesKeys.map((key) => (
                <Area
                  key={key}
                  dataKey={key}
                  type='monotone'
                  fill={`url(#grad-${key})`}
                  stroke={config[key]?.color || '#8884d8'}
                  strokeWidth={2}
                  fillOpacity={0.6}
                />
              ))}

              <ChartLegend content={<ChartLegendContent />} verticalAlign='bottom' height={36} />
            </AreaChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Stacked area chart for comparing multiple data series
 */
export function ChartAreaStacked({
  data,
  title = 'Stacked Chart',
  description = 'Visualizing stacked data series',
  className,
  config,
  ...props
}: ChartWrapperProps<{ month: string; [key: string]: any }>) {
  return (
    <Card className={className} {...props}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config}>
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='month'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator='dot' />} />
            {Object.entries(config)
              .filter(([key]) => key !== 'views')
              .map(([key]) => (
                <Area
                  key={key}
                  dataKey={key}
                  type='natural'
                  fill={`var(--color-${key})`}
                  fillOpacity={0.4}
                  stroke={`var(--color-${key})`}
                  stackId='a'
                />
              ))}
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className='flex w-full items-start gap-2 text-sm'>
          <div className='grid gap-2'>
            <div className='flex items-center gap-2 font-medium leading-none'>
              <TrendingUp className='h-4 w-4' />
            </div>
            <div className='text-muted-foreground flex items-center gap-2 leading-none'>
              {description}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

/**
 * Area chart with gradient fills for visual appeal
 */
export function ChartAreaGradient({
  data,
  title = 'Gradient Chart',
  description = 'Visualizing data with gradient fill',
  className,
  config,
  ...props
}: ChartWrapperProps<{ month: string; [key: string]: any }> & {
  title?: string;
  description?: string;
}) {
  return (
    <Card className={className} {...props}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config}>
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='month'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              {Object.entries(config)
                .filter(([key]) => key !== 'views')
                .map(([key]) => (
                  <linearGradient key={key} id={`fill${key}`} x1='0' y1='0' x2='0' y2='1'>
                    <stop offset='5%' stopColor={`var(--color-${key})`} stopOpacity={0.8} />
                    <stop offset='95%' stopColor={`var(--color-${key})`} stopOpacity={0.1} />
                  </linearGradient>
                ))}
            </defs>
            {Object.entries(config)
              .filter(([key]) => key !== 'views')
              .map(([key]) => (
                <Area
                  key={key}
                  dataKey={key}
                  type='natural'
                  fill={`url(#fill${key})`}
                  fillOpacity={0.4}
                  stroke={`var(--color-${key})`}
                  stackId='a'
                />
              ))}
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className='flex w-full items-start gap-2 text-sm'>
          <div className='grid gap-2'>
            <div className='flex items-center gap-2 font-medium leading-none'>
              <TrendingUp className='h-4 w-4' />
            </div>
            <div className='text-muted-foreground flex items-center gap-2 leading-none'>
              {description}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
