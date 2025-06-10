'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';

import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart } from 'recharts';

import { cn } from '../../lib/utils';
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
 * Radar chart for comparing multiple metrics
 */
export function ChartRadarMultiple({
  data,
  title = 'Radar Chart',
  description = 'Multi-dimensional data visualization',
  className,
  config,
  categoryKey = 'category',
  ...props
}: ChartWrapperProps<{ [key: string]: any }> & {
  categoryKey?: string;
}) {
  const seriesKeys = React.useMemo(() => {
    return Object.entries(config)
      .filter(([key]) => key !== categoryKey && key !== 'views')
      .map(([key]) => key);
  }, [config, categoryKey]);

  return (
    <Card className={cn('h-full', className)} {...props}>
      <CardHeader className='pb-2'>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className='pt-0'>
        <div className='h-[260px] w-full'>
          <ChartContainer config={config} className='h-full w-full'>
            <RadarChart
              outerRadius={90}
              data={data}
              margin={{ top: 10, right: 10, bottom: 30, left: 10 }}
            >
              <PolarGrid stroke='#ccc' opacity={0.3} />
              <PolarAngleAxis dataKey={categoryKey} tick={{ fill: '#888', fontSize: 12 }} />
              <PolarRadiusAxis domain={[0, 'auto']} tick={false} axisLine={false} />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    indicator='line'
                    formatter={(value) => value.toLocaleString()}
                  />
                }
              />
              {seriesKeys.map((key) => (
                <Radar
                  key={key}
                  name={`${config[key]?.label || key}`}
                  dataKey={key}
                  stroke={config[key]?.color || '#8884d8'}
                  fill={config[key]?.color || '#8884d8'}
                  fillOpacity={0.6}
                />
              ))}
              <ChartLegend content={<ChartLegendContent />} verticalAlign='bottom' height={30} />
            </RadarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Radar chart with legend for dimension explanation
 */
export function ChartRadarLegend({
  data,
  title = 'Radar Chart with Legend',
  description = 'Multi-dimensional data with dimension explanation',
  className,
  config,
  categoryKey = 'category',
  ...props
}: ChartWrapperProps<{ [key: string]: any }> & {
  categoryKey?: string;
}) {
  const seriesKeys = React.useMemo(() => {
    return Object.entries(config)
      .filter(([key]) => key !== categoryKey && key !== 'views')
      .map(([key]) => key);
  }, [config, categoryKey]);

  return (
    <Card className={cn('h-full', className)} {...props}>
      <CardHeader className='pb-2'>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className='pt-0'>
        <div className='h-[260px] w-full'>
          <ChartContainer config={config} className='h-full w-full'>
            <RadarChart
              outerRadius={80}
              data={data}
              margin={{ top: 10, right: 10, bottom: 50, left: 10 }}
            >
              <PolarGrid stroke='#ccc' opacity={0.3} />
              <PolarAngleAxis dataKey={categoryKey} tick={{ fill: '#888', fontSize: 12 }} />
              <PolarRadiusAxis domain={[0, 'auto']} tick={false} axisLine={false} />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    indicator='line'
                    formatter={(value) => value.toLocaleString()}
                  />
                }
              />
              {seriesKeys.map((key) => (
                <Radar
                  key={key}
                  name={`${config[key]?.label || key}`}
                  dataKey={key}
                  stroke={config[key]?.color || '#8884d8'}
                  fill={config[key]?.color || '#8884d8'}
                  fillOpacity={0.6}
                />
              ))}
              <ChartLegend
                content={<ChartLegendContent className='grid grid-cols-3 gap-3 text-xs' />}
                verticalAlign='bottom'
                height={50}
              />
            </RadarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
