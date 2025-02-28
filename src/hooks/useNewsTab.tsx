
import { useSearchParams } from 'react-router-dom';

export type NewsTabType = 'latest' | 'featured';

export function useNewsTab() {
  const [params, setParams] = useSearchParams();

  const tab = (params.get('tab') || 'latest') as NewsTabType;

  function setTab(tab: NewsTabType) {
    setParams({ tab });
  }

  return [tab, setTab] as const;
}