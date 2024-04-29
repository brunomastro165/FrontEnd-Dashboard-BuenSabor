import { Card, ProgressBar} from '@tremor/react';

export default function Example() {
  return (
    <Card className="mx-auto max-w-md font-semibold dark:bg-white" decoration="top" decorationColor="red" >
      <h4 className="text-tremor-default text-tremor-content dark:text-tremor-content-emphasis">
        Ventas
      </h4>
      <p className="text-tremor-metric font-semibold text-tremor-content-strong dark:text-tremor-content-strong">
        $71,465
      </p>
      <p className="mt-4 flex items-center justify-between text-tremor-default text-tremor-content dark:text-tremor-content-emphasis">
        <span>32% de Objetivo Anual</span>
        <span>$225,000</span>
      </p>
      <ProgressBar value={32} className="mt-2 to-tremor-brand dark:bg-tremor-brand-faint" />
    </Card>
  );
}