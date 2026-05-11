import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { WalletPanel } from '@/components/wallet/WalletPanel';
import { MiningPanel } from '@/components/mining/MiningPanel';
import { ValidatorPanel } from '@/components/validator/ValidatorPanel';
import { TelemetryPanel } from '@/components/telemetry/TelemetryPanel';

export default function HomePage() {
  return (
    <DashboardLayout>
      <div className="grid grid-cols-12 gap-4 p-4 h-full">
        {/* Top row – wallet + mining summary */}
        <div className="col-span-12 lg:col-span-4">
          <WalletPanel />
        </div>
        <div className="col-span-12 lg:col-span-4">
          <MiningPanel />
        </div>
        <div className="col-span-12 lg:col-span-4">
          <ValidatorPanel />
        </div>
        {/* Bottom row – telemetry */}
        <div className="col-span-12">
          <TelemetryPanel />
        </div>
      </div>
    </DashboardLayout>
  );
}
