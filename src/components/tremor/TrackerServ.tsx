import { Card, Tracker, type Color } from '@tremor/react';

interface Tracker {
  color: Color;
  tooltip: string;
}

const data: Tracker[] = [
  { color: 'emerald', tooltip: 'Deployado' },
  { color: 'emerald', tooltip: 'Deployado' },
  { color: 'emerald', tooltip: 'Deployado' },
  { color: 'emerald', tooltip: 'Deployado' },
  { color: 'emerald', tooltip: 'Deployado' },
  { color: 'emerald', tooltip: 'Deployado' },
  { color: 'emerald', tooltip: 'Deployado' },
  { color: 'emerald', tooltip: 'Deployado' },
  { color: 'emerald', tooltip: 'Deployado' },
  { color: 'emerald', tooltip: 'Deployado' },
  { color: 'emerald', tooltip: 'Deployado' },
  { color: 'emerald', tooltip: 'Deployado' },
  { color: 'emerald', tooltip: 'Deployado' },
  { color: 'emerald', tooltip: 'Deployado' },
  { color: 'rose', tooltip: 'Caido' },
  { color: 'emerald', tooltip: 'Deployado' },
  { color: 'emerald', tooltip: 'Deployado' },
  { color: 'emerald', tooltip: 'Deployado' },
  { color: 'emerald', tooltip: 'Deployado' },
  { color: 'gray', tooltip: 'Mantenimiento' },
  { color: 'emerald', tooltip: 'Deployado' },
  { color: 'emerald', tooltip: 'Deployado' },
  { color: 'emerald', tooltip: 'Deployado' },
  { color: 'rose', tooltip: 'Caido' },
  { color: 'emerald', tooltip: 'Deployado' },
];

export function TrackerServ() {
  return (
    <Card className="mx-auto max-w-md">
      <p className="text-tremor-default flex items-center justify-between">
        <span className="text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium">El Buen Sabor</span>
        <span className="text-tremor-content dark:text-dark-tremor-content">uptime 99.1%</span>
      </p>
      <Tracker data={data} className="mt-2" />
    </Card>
  );
}