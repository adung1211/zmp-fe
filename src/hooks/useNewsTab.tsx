
import { useSearchParams } from 'react-router-dom';

export function useNewsTab() {
  const [params, setParams] = useSearchParams();

  const tab = (params.get('tab') || 'latest') as string;

  function setTab(tab: string) {
    setParams({ tab });
  }

  return [tab, setTab] as const;
}