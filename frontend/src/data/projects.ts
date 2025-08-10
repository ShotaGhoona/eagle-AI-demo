import { Project } from '@/types/project'

export const dummyProjects: Project[] = [
  {
    id: '1',
    title: 'ECサイトリニューアル',
    description: '既存のECサイトを最新技術でリニューアルし、UX改善と売上向上を目指す',
    daysRemaining: 15,
    progress: 75,
    phases: [
      { id: '1', name: '企画', status: 'completed', color: 'blue' },
      { id: '2', name: 'デザイン', status: 'completed', color: 'purple' },
      { id: '3', name: '開発', status: 'completed', color: 'yellow' },
      { id: '4', name: 'テスト', status: 'current', color: 'green' },
      { id: '5', name: 'デプロイ', status: 'upcoming', color: 'red' }
    ],
    currentPhaseIndex: 3,
    team: [
      { id: '1', name: '山田太郎', avatar: '/avatars/01.png', role: 'PM' },
      { id: '2', name: '佐藤花子', avatar: '/avatars/02.png', role: 'Frontend' },
      { id: '3', name: '田中一郎', avatar: '/avatars/03.png', role: 'Backend' },
      { id: '4', name: '鈴木美咲', avatar: '/avatars/04.png', role: 'Designer' }
    ],
    status: 'active',
    priority: 'high',
    startDate: '2024-01-15',
    endDate: '2024-03-30'
  },
  {
    id: '2',
    title: '社内管理システム開発',
    description: '人事管理、プロジェクト管理、経費管理を統合した社内システム',
    daysRemaining: 45,
    progress: 45,
    phases: [
      { id: '1', name: '要件定義', status: 'completed', color: 'blue' },
      { id: '2', name: 'UI設計', status: 'completed', color: 'purple' },
      { id: '3', name: 'バックエンド開発', status: 'current', color: 'orange' },
      { id: '4', name: 'フロントエンド開発', status: 'upcoming', color: 'green' },
      { id: '5', name: '統合テスト', status: 'upcoming', color: 'yellow' },
      { id: '6', name: 'デプロイ', status: 'upcoming', color: 'red' }
    ],
    currentPhaseIndex: 2,
    team: [
      { id: '5', name: '橋本健太', avatar: '/avatars/05.png', role: 'Lead' },
      { id: '6', name: '松本由美', avatar: '/avatars/06.png', role: 'Frontend' },
      { id: '7', name: '高橋誠', avatar: '/avatars/07.png', role: 'Backend' }
    ],
    status: 'active',
    priority: 'high',
    startDate: '2024-02-01',
    endDate: '2024-05-31'
  },
  {
    id: '3',
    title: 'APIリファクタリング',
    description: 'レガシーAPIの最新化とパフォーマンス改善',
    daysRemaining: 5,
    progress: 90,
    phases: [
      { id: '1', name: '分析', status: 'completed', color: 'blue' },
      { id: '2', name: 'リファクタリング', status: 'completed', color: 'orange' },
      { id: '3', name: 'テスト', status: 'completed', color: 'purple' },
      { id: '4', name: 'デプロイ', status: 'current', color: 'green' }
    ],
    currentPhaseIndex: 3,
    team: [
      { id: '8', name: '中村拓也', avatar: '/avatars/08.png', role: 'Backend' },
      { id: '9', name: '小林恵子', avatar: '/avatars/09.png', role: 'DevOps' }
    ],
    status: 'active',
    priority: 'medium',
    startDate: '2024-01-10',
    endDate: '2024-02-28'
  },
  {
    id: '4',
    title: 'モバイルアプリ開発',
    description: 'iOS/Android対応のネイティブアプリケーション開発',
    daysRemaining: 120,
    progress: 20,
    phases: [
      { id: '1', name: '企画', status: 'current', color: 'blue' },
      { id: '2', name: 'UI/UXデザイン', status: 'upcoming', color: 'purple' },
      { id: '3', name: 'iOS開発', status: 'upcoming', color: 'green' },
      { id: '4', name: 'Android開発', status: 'upcoming', color: 'orange' },
      { id: '5', name: 'テスト', status: 'upcoming', color: 'yellow' },
      { id: '6', name: 'ストア申請', status: 'upcoming', color: 'red' },
      { id: '7', name: 'リリース', status: 'upcoming', color: 'pink' }
    ],
    currentPhaseIndex: 0,
    team: [
      { id: '10', name: '渡辺慎一', avatar: '/avatars/10.png', role: 'Mobile Dev' },
      { id: '11', name: '伊藤真理', avatar: '/avatars/11.png', role: 'Designer' },
      { id: '12', name: '加藤裕介', avatar: '/avatars/12.png', role: 'QA' }
    ],
    status: 'active',
    priority: 'low',
    startDate: '2024-03-01',
    endDate: '2024-08-31'
  },
  {
    id: '5',
    title: 'データ分析基盤構築',
    description: 'ビッグデータ処理とBI分析のためのデータレイク構築',
    daysRemaining: 0,
    progress: 100,
    phases: [
      { id: '1', name: '設計', status: 'completed', color: 'blue' },
      { id: '2', name: '基盤構築', status: 'completed', color: 'orange' },
      { id: '3', name: 'データ連携', status: 'completed', color: 'green' },
      { id: '4', name: '完了', status: 'completed', color: 'gray' }
    ],
    currentPhaseIndex: 3,
    team: [
      { id: '13', name: '斎藤光一', avatar: '/avatars/13.png', role: 'Data Engineer' },
      { id: '14', name: '木村麻衣', avatar: '/avatars/14.png', role: 'Analyst' }
    ],
    status: 'completed',
    priority: 'medium',
    startDate: '2023-10-01',
    endDate: '2024-01-31'
  },
  {
    id: '6',
    title: 'セキュリティ監査対応',
    description: 'セキュリティ脆弱性の診断と修正対応',
    daysRemaining: -10,
    progress: 30,
    phases: [
      { id: '1', name: '監査', status: 'completed', color: 'blue' },
      { id: '2', name: '脆弱性修正', status: 'current', color: 'red' },
      { id: '3', name: '再テスト', status: 'upcoming', color: 'yellow' }
    ],
    currentPhaseIndex: 1,
    team: [
      { id: '15', name: '岡田秀樹', avatar: '/avatars/15.png', role: 'Security' },
      { id: '16', name: '森田直子', avatar: '/avatars/16.png', role: 'Backend' }
    ],
    status: 'on-hold',
    priority: 'high',
    startDate: '2024-01-20',
    endDate: '2024-02-15'
  }
]