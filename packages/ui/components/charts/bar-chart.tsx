'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import { cn } from '../../lib';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../card';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartWrapperProps,
} from '../chart';

/**
 * Interactive bar chart with selectable data series
 */
export function ChartBarInteractive({
  data,
  title = 'Interactive Bar Chart',
  description = 'Data visualization with series selection',
  className,
  config,
  xAxisKey = 'date',
  ...props
}: ChartWrapperProps<{ [key: string]: any }> & {
  xAxisKey?: string;
}) {
  const seriesKeys = React.useMemo(() => {
    return Object.entries(config)
      .filter(([key]) => key !== 'views')
      .map(([key]) => key);
  }, [config]);

  const [activeSeries, setActiveSeries] = React.useState<string>(seriesKeys[0] || '');

  const total = React.useMemo(() => {
    if (!data || !data.length) return {};

    return seriesKeys.reduce(
      (acc, key) => {
        acc[key] = data.reduce((sum, item) => sum + (item[key] || 0), 0);
        return acc;
      },
      {} as Record<string, number>
    );
  }, [data, seriesKeys]);

  return (
    <Card className={cn('h-full', className)} {...props}>
      <CardHeader className='flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row'>
        <div className='flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6'>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        <div className='flex'>
          {seriesKeys.map((key) => (
            <button
              key={key}
              data-active={activeSeries === key}
              className='data-[active=true]:bg-muted/50 relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-l sm:border-t-0 sm:px-8 sm:py-6'
              onClick={() => setActiveSeries(key)}
            >
              <span className='text-muted-foreground text-xs'>{config[key]?.label || key}</span>
              <span className='text-lg font-bold leading-none sm:text-3xl'>
                £{total[key]?.toLocaleString()}
              </span>
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent className='pt-6'>
        <div className='h-[260px] w-full'>
          <ChartContainer config={config} className='h-full w-full'>
            <BarChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 25 }}>
              <CartesianGrid strokeDasharray='3 3' stroke='#ccc' opacity={0.3} />
              <XAxis
                dataKey={xAxisKey}
                tickLine={false}
                axisLine={false}
                tickMargin={12}
                tickFormatter={(value) => {
                  if (value && value.includes('-')) {
                    const date = new Date(value);
                    return date.toLocaleDateString('en-US', {
                      month: 'short',
                    });
                  }
                  return value;
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
                cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                content={
                  <ChartTooltipContent
                    formatter={(value) => `£${value.toLocaleString()}`}
                    labelFormatter={(value) => {
                      if (value && typeof value === 'string' && value.includes('-')) {
                        return new Date(value).toLocaleDateString('en-US', {
                          month: 'long',
                          year: 'numeric',
                        });
                      }
                      return value;
                    }}
                  />
                }
              />
              <Bar
                dataKey={activeSeries}
                fill={config[activeSeries]?.color || '#8884d8'}
                radius={[4, 4, 0, 0]}
                barSize={45}
              />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Horizontal bar chart for category comparisons
 */
export function ChartBarHorizontal({
  data,
  title = 'Horizontal Bar Chart',
  description = 'Category comparison visualization',
  className,
  config,
  dataKey = 'category',
  valueKey = 'value',
  ...props
}: ChartWrapperProps<{ [key: string]: any }> & {
  dataKey?: string;
  valueKey?: string;
}) {
  return (
    <Card className={cn('h-full', className)} {...props}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className='pt-6'>
        <div className='h-[260px] w-full'>
          <ChartContainer config={config}>
            <BarChart
              layout='vertical'
              data={data}
              margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray='3 3'
                horizontal={true}
                vertical={false}
                opacity={0.3}
              />
              <XAxis
                type='number'
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) =>
                  value === 0 ? '' : `£${(value / 1000).toLocaleString()}k`
                }
              />
              <YAxis
                dataKey={dataKey}
                type='category'
                tickLine={false}
                axisLine={false}
                width={70}
                tickMargin={10}
              />
              <ChartTooltip
                cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                content={
                  <ChartTooltipContent formatter={(value) => `£${value.toLocaleString()}`} />
                }
              />
              <Bar
                dataKey={valueKey}
                fill={config[valueKey]?.color || '#8884d8'}
                radius={4}
                barSize={30}
              />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Stacked bar chart for compositional data
 */
export function ChartBarStacked({
  data,
  title = 'Stacked Bar Chart',
  description = 'Visualizing compositional data',
  className,
  config,
  xAxisKey = 'date',
  ...props
}: ChartWrapperProps<{ [key: string]: any }> & {
  xAxisKey?: string;
}) {
  const seriesKeys = React.useMemo(() => {
    return Object.entries(config)
      .filter(([key]) => key !== 'views')
      .map(([key]) => key);
  }, [config]);

  return (
    <Card className={cn('h-full', className)} {...props}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className='pt-6'>
        <div className='h-[260px] w-full'>
          <ChartContainer config={config} className='h-full w-full'>
            <BarChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 25 }}>
              <CartesianGrid strokeDasharray='3 3' stroke='#ccc' opacity={0.3} />
              <XAxis
                dataKey={xAxisKey}
                tickLine={false}
                axisLine={false}
                tickMargin={12}
                tickFormatter={(value) => {
                  if (value && value.includes('-')) {
                    const date = new Date(value);
                    return date.toLocaleDateString('en-US', {
                      month: 'short',
                    });
                  }
                  return value;
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
                cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                content={
                  <ChartTooltipContent
                    indicator='dot'
                    formatter={(value) => `£${value.toLocaleString()}`}
                  />
                }
              />
              {seriesKeys.map((key) => (
                <Bar
                  key={key}
                  dataKey={key}
                  stackId='a'
                  fill={`var(--color-${key})`}
                  radius={[0, 0, 0, 0]}
                  barSize={45}
                />
              ))}
              <ChartLegend content={<ChartLegendContent />} verticalAlign='bottom' height={36} />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Multiple bar chart for direct comparisons
 */
export function ChartBarMultiple({
  data,
  title = 'Multiple Bar Chart',
  description = 'Direct comparison visualization',
  className,
  config,
  xAxisKey = 'category',
  ...props
}: ChartWrapperProps<{ [key: string]: any }> & {
  xAxisKey?: string;
}) {
  const seriesKeys = React.useMemo(() => {
    return Object.entries(config)
      .filter(([key]) => key !== 'views')
      .map(([key]) => key);
  }, [config]);

  return (
    <Card className={cn('h-full', className)} {...props}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className='pt-6'>
        <div className='h-[260px] w-full'>
          <ChartContainer config={config} className='h-full w-full'>
            <BarChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 25 }}>
              <CartesianGrid strokeDasharray='3 3' stroke='#ccc' opacity={0.3} />
              <XAxis
                dataKey={xAxisKey}
                tickLine={false}
                axisLine={false}
                tickMargin={12}
                tickFormatter={(value) => {
                  if (value && typeof value === 'string' && value.includes('-')) {
                    const date = new Date(value);
                    return date.toLocaleDateString('en-US', {
                      month: 'short',
                    });
                  }
                  return value;
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
                cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                content={
                  <ChartTooltipContent formatter={(value) => `£${value.toLocaleString()}`} />
                }
              />
              {seriesKeys.map((key) => (
                <Bar
                  key={key}
                  dataKey={key}
                  fill={config[key]?.color || '#8884d8'}
                  radius={4}
                  barSize={15}
                />
              ))}
              <ChartLegend content={<ChartLegendContent />} verticalAlign='bottom' height={36} />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
