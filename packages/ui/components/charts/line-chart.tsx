'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';

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
 * Interactive line chart with selectable data series
 */
export function ChartLineInteractive({
  data,
  title = 'Interactive Line Chart',
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
            <LineChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 25 }}>
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
                cursor={{ stroke: '#ccc', strokeDasharray: '3 3' }}
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
              <Line
                type='monotone'
                dataKey={activeSeries}
                stroke={config[activeSeries]?.color || '#8884d8'}
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            </LineChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Multiple line chart for trend comparison
 */
export function ChartLineMultiple({
  data,
  title = 'Multiple Line Chart',
  description = 'Trend comparison visualization',
  className,
  config,
  xAxisKey = 'month',
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
            <LineChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 25 }}>
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
                  return typeof value === 'string' ? value.slice(0, 3) : value;
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
                  <ChartTooltipContent formatter={(value) => `£${value.toLocaleString()}`} />
                }
              />
              {seriesKeys.map((key) => (
                <Line
                  key={key}
                  dataKey={key}
                  type='monotone'
                  stroke={`var(--color-${key})`}
                  strokeWidth={3}
                  dot={false}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              ))}
              <ChartLegend content={<ChartLegendContent />} verticalAlign='bottom' height={36} />
            </LineChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Line chart with dots for emphasizing data points
 */
export function ChartLineDots({
  data,
  title = 'Line Chart with Dots',
  description = 'Trend visualization with highlighted points',
  className,
  config,
  xAxisKey = 'date',
  valueKey,
  ...props
}: ChartWrapperProps<{ [key: string]: any }> & {
  xAxisKey?: string;
  valueKey?: string;
}) {
  const seriesKey =
    valueKey ||
    Object.entries(config)
      .filter(([key]) => key !== 'views')
      .map(([key]) => key)[0] ||
    '';

  return (
    <Card className={cn('h-full', className)} {...props}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className='pt-6'>
        <div className='h-[260px] w-full'>
          <ChartContainer config={config}>
            <LineChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 25 }}>
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
                  return typeof value === 'string' ? value.slice(0, 3) : value;
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
                  <ChartTooltipContent formatter={(value) => `£${value.toLocaleString()}`} />
                }
              />
              <Line
                type='monotone'
                dataKey={seriesKey}
                stroke={config[seriesKey]?.color || '#8884d8'}
                strokeWidth={2}
                dot={{
                  r: 4,
                  strokeWidth: 2,
                  fill: '#fff',
                  stroke: config[seriesKey]?.color || '#8884d8',
                }}
                activeDot={{
                  r: 6,
                  strokeWidth: 0,
                  fill: config[seriesKey]?.color || '#8884d8',
                }}
              />
            </LineChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
