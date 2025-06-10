'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';

import { Cell, Label, Pie, PieChart, Sector } from 'recharts';

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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../select';

/**
 * Interactive pie chart with selectable segments
 */
export function ChartPieInteractive({
  data,
  title = 'Interactive Pie Chart',
  description = 'Data visualization with segment selection',
  className,
  config,
  nameKey = 'name',
  valueKey = 'value',
  ...props
}: ChartWrapperProps<{ [key: string]: any }> & {
  nameKey?: string;
  valueKey?: string;
}) {
  const id = React.useId();
  const chartId = `chart-${id.replace(/:/g, '')}`;

  const categories = React.useMemo(() => {
    return data.map((item) => item[nameKey]);
  }, [data, nameKey]);

  const [activeCategory, setActiveCategory] = React.useState(categories[0] || '');

  const activeIndex = React.useMemo(
    () => data.findIndex((item) => item[nameKey] === activeCategory),
    [data, activeCategory, nameKey]
  );

  // Generate colors for each segment
  const colors = React.useMemo(() => {
    return data.map((item) => {
      const configKey = item[nameKey].replace(/\s+/g, '');
      return config[configKey]?.color || `hsl(${Math.random() * 360}, 70%, 60%)`;
    });
  }, [data, config, nameKey]);

  return (
    <Card className={cn('flex h-full flex-col', className)} {...props}>
      <CardHeader className='flex-row items-start space-y-0 pb-0'>
        <div className='grid gap-1'>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        <Select value={activeCategory} onValueChange={setActiveCategory}>
          <SelectTrigger
            className='ml-auto h-8 w-[130px] rounded-lg pl-2.5'
            aria-label='Select a category'
          >
            <SelectValue placeholder='Select category' />
          </SelectTrigger>
          <SelectContent align='end' className='rounded-xl'>
            {categories.map((category) => {
              const categoryKey = category.replace(/\s+/g, '');
              const configItem = config[categoryKey];

              return (
                <SelectItem key={category} value={category} className='rounded-lg [&_span]:flex'>
                  <div className='flex items-center gap-2 text-xs'>
                    <span
                      className='rounded-xs flex h-3 w-3 shrink-0'
                      style={{
                        backgroundColor: configItem?.color || colors[categories.indexOf(category)],
                      }}
                    />
                    {category}
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className='flex flex-1 justify-center pt-6'>
        <div className='h-[260px] w-full'>
          <ChartContainer config={config} className='h-full w-full'>
            <PieChart margin={{ top: 0, right: 0, bottom: 25, left: 0 }}>
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    hideLabel
                    formatter={(value) => `£${value.toLocaleString()}`}
                  />
                }
              />
              <Pie
                data={data}
                dataKey={valueKey}
                nameKey={nameKey}
                innerRadius={60}
                outerRadius={100}
                strokeWidth={1}
                stroke='#ffffff'
                activeIndex={activeIndex}
                activeShape={(props: any) => {
                  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload } =
                    props;
                  return (
                    <g>
                      <Sector
                        cx={cx}
                        cy={cy}
                        innerRadius={innerRadius}
                        outerRadius={outerRadius + 10}
                        startAngle={startAngle}
                        endAngle={endAngle}
                        fill={fill}
                      />
                      <Sector
                        cx={cx}
                        cy={cy}
                        innerRadius={outerRadius + 14}
                        outerRadius={outerRadius + 16}
                        startAngle={startAngle}
                        endAngle={endAngle}
                        fill={fill}
                      />
                      <text
                        x={cx}
                        y={cy}
                        textAnchor='middle'
                        dominantBaseline='middle'
                        className='fill-foreground text-2xl font-bold'
                      >
                        £{payload[valueKey].toLocaleString()}
                      </text>
                    </g>
                  );
                }}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Donut chart with central text
 */
export function ChartPieDonutText({
  data,
  title = 'Donut Chart',
  description = 'Data visualization with summary',
  className,
  config,
  nameKey = 'name',
  valueKey = 'value',
  ...props
}: ChartWrapperProps<{ [key: string]: any }> & {
  nameKey?: string;
  valueKey?: string;
}) {
  const totalValue = React.useMemo(() => {
    return data.reduce((acc, curr) => acc + (curr[valueKey] || 0), 0);
  }, [data, valueKey]);

  // Generate colors for each segment
  const colors = React.useMemo(() => {
    return data.map((item) => {
      const configKey = item[nameKey].replace(/\s+/g, '');
      if (config[configKey]) {
        return config[configKey].color;
      }
      // Fallback color generation
      return `hsl(${Math.random() * 360}, 70%, 60%)`;
    });
  }, [data, config, nameKey]);

  return (
    <Card className={cn('flex h-full flex-col', className)} {...props}>
      <CardHeader className='pb-2'>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className='flex flex-1 items-center justify-center pt-0'>
        <div className='h-[260px] w-full'>
          <ChartContainer config={config} className='h-full w-full'>
            <PieChart margin={{ top: 0, right: 0, bottom: 25, left: 0 }}>
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    hideLabel={false}
                    formatter={(value) => `£${value.toLocaleString()}`}
                  />
                }
              />
              <Pie
                data={data}
                dataKey={valueKey}
                nameKey={nameKey}
                innerRadius={70}
                outerRadius={100}
                paddingAngle={1}
                strokeWidth={1}
                stroke='#ffffff'
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                      return (
                        <g>
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy! - 10}
                            textAnchor='middle'
                            dominantBaseline='middle'
                            className='fill-foreground text-2xl font-bold'
                          >
                            £{totalValue.toLocaleString()}
                          </text>
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy! + 15}
                            textAnchor='middle'
                            dominantBaseline='middle'
                            className='fill-muted-foreground text-sm'
                          >
                            Total
                          </text>
                        </g>
                      );
                    }
                    return null;
                  }}
                />
              </Pie>
              <ChartLegend
                content={<ChartLegendContent nameKey={nameKey} />}
                verticalAlign='bottom'
                height={36}
              />
            </PieChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Simple pie chart with legend
 */
export function ChartPieLegend({
  data,
  title = 'Pie Chart with Legend',
  description = 'Data visualization with category legend',
  className,
  config,
  nameKey = 'name',
  valueKey = 'value',
  ...props
}: ChartWrapperProps<{ [key: string]: any }> & {
  nameKey?: string;
  valueKey?: string;
}) {
  // Generate colors for each segment
  const colors = React.useMemo(() => {
    return data.map((item) => {
      const configKey = item[nameKey].replace(/\s+/g, '');
      return config[configKey]?.color || `hsl(${Math.random() * 360}, 70%, 60%)`;
    });
  }, [data, config, nameKey]);

  return (
    <Card className={cn('flex h-full flex-col', className)} {...props}>
      <CardHeader className='items-center pb-2'>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className='flex-1 pt-0'>
        <div className='h-[260px] w-full'>
          <ChartContainer config={config} className='h-full w-full'>
            <PieChart margin={{ top: 0, right: 0, bottom: 45, left: 0 }}>
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    hideLabel
                    formatter={(value) => `£${value.toLocaleString()}`}
                  />
                }
              />
              <Pie
                data={data}
                dataKey={valueKey}
                nameKey={nameKey}
                cx='50%'
                cy='50%'
                outerRadius={80}
                stroke='#fff'
                strokeWidth={1}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <ChartLegend
                content={
                  <ChartLegendContent nameKey={nameKey} className='grid grid-cols-2 gap-3' />
                }
                layout='horizontal'
                verticalAlign='bottom'
                align='center'
                height={45}
              />
            </PieChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
