'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';

import { PolarAngleAxis, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts';

import { cn } from '../../lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../card';
import { ChartContainer, type ChartWrapperProps } from '../chart';

/**
 * Radial chart with text display
 */
export function ChartRadialText({
  data,
  title = 'Radial Chart',
  description = 'Progress visualization with text',
  className,
  config,
  valueKey = 'value',
  maxValue = 100,
  ...props
}: ChartWrapperProps<{ [key: string]: any }> & {
  valueKey?: string;
  maxValue?: number;
}) {
  const value = React.useMemo(() => {
    return data[0]?.[valueKey] || 0;
  }, [data, valueKey]);

  const progress = React.useMemo(() => {
    return Math.min(100, Math.max(0, (value / maxValue) * 100));
  }, [value, maxValue]);

  const dataKey = Object.keys(config)[0] || valueKey;

  return (
    <Card className={cn('flex h-full flex-col', className)} {...props}>
      <CardHeader className='pb-2'>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className='flex-1 pt-0'>
        <div className='h-[260px] w-full'>
          <ChartContainer config={config} className='h-full w-full'>
            <RadialBarChart
              innerRadius={80}
              outerRadius={120}
              barSize={12}
              data={data}
              startAngle={90}
              endAngle={-270}
              margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
            >
              <PolarAngleAxis
                type='number'
                domain={[0, maxValue]}
                tick={false}
                tickLine={false}
                axisLine={false}
              />
              <PolarRadiusAxis tick={false} tickLine={false} axisLine={false} />
              <RadialBar
                background
                dataKey={valueKey}
                cornerRadius={12}
                fill={config[dataKey]?.color || '#8884d8'}
              />
              <text
                x='50%'
                y='50%'
                textAnchor='middle'
                dominantBaseline='middle'
                className='fill-foreground text-3xl font-bold'
              >
                {value.toLocaleString()}
              </text>
              <text
                x='50%'
                y='58%'
                textAnchor='middle'
                dominantBaseline='middle'
                className='fill-muted-foreground text-sm'
              >
                {progress.toFixed(0)}%
              </text>
            </RadialBarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Radial chart with stacked metrics
 */
export function ChartRadialStacked({
  data,
  title = 'Stacked Radial Chart',
  description = 'Multi-metric progress visualization',
  className,
  config,
  ...props
}: ChartWrapperProps<{ [key: string]: any }>) {
  const seriesKeys = React.useMemo(() => {
    return Object.entries(config)
      .filter(([key]) => key !== 'views')
      .map(([key]) => key);
  }, [config]);

  const total = React.useMemo(() => {
    if (!data || !data.length) return 0;
    return seriesKeys.reduce((sum, key) => sum + (data[0]?.[key] || 0), 0);
  }, [data, seriesKeys]);

  return (
    <Card className={cn('flex h-full flex-col', className)} {...props}>
      <CardHeader className='pb-2'>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className='flex-1 pt-0'>
        <div className='h-[260px] w-full'>
          <ChartContainer config={config} className='h-full w-full'>
            <RadialBarChart
              innerRadius={60}
              outerRadius={120}
              barSize={12}
              data={data}
              startAngle={90}
              endAngle={-270}
              margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
            >
              <PolarAngleAxis tick={false} tickLine={false} axisLine={false} />
              <PolarRadiusAxis tick={false} tickLine={false} axisLine={false} />
              {seriesKeys.map((key) => (
                <RadialBar
                  key={key}
                  dataKey={key}
                  cornerRadius={12}
                  fill={config[key]?.color || '#8884d8'}
                />
              ))}
              <text
                x='50%'
                y='50%'
                textAnchor='middle'
                dominantBaseline='middle'
                className='fill-foreground text-3xl font-bold'
              >
                {total.toLocaleString()}
              </text>
              <text
                x='50%'
                y='58%'
                textAnchor='middle'
                dominantBaseline='middle'
                className='fill-muted-foreground text-sm'
              >
                Total
              </text>
            </RadialBarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
