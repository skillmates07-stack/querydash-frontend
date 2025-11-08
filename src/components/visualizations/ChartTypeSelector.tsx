import { useVisualization } from '@/contexts/VisualizationContext';
import { 
  LineChart as LineChartIcon, 
  BarChart3, 
  PieChart as PieChartIcon, 
  Table2, 
  Hash,
  TrendingUp 
} from 'lucide-react';

const chartTypes = [
  { 
    type: 'line', 
    icon: LineChartIcon, 
    name: 'Line Chart', 
    color: '#5b47fb',
    description: 'Show trends over time'
  },
  { 
    type: 'bar', 
    icon: BarChart3, 
    name: 'Bar Chart', 
    color: '#3b82f6',
    description: 'Compare categories'
  },
  { 
    type: 'area', 
    icon: TrendingUp, 
    name: 'Area Chart', 
    color: '#10b981',
    description: 'Show volume over time'
  },
  { 
    type: 'pie', 
    icon: PieChartIcon, 
    name: 'Pie Chart', 
    color: '#f59e0b',
    description: 'Show proportions'
  },
  { 
    type: 'metric', 
    icon: Hash, 
    name: 'Metric Card', 
    color: '#ef4444',
    description: 'Display key numbers'
  },
  { 
    type: 'table', 
    icon: Table2, 
    name: 'Data Table', 
    color: '#8b5cf6',
    description: 'Show raw data'
  }
];
