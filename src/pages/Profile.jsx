import { User, Trophy, Star, Award, Target } from 'lucide-react';
import MissionList from '../components/MissionList';
import useStore from '../store/useStore';
import { badgeDefinitions } from '../data/mockData';

const Profile = () => {
  const { currentUser } = useStore();

  // 計算進度條
  const currentLevelPoints = (currentUser.level - 1) * 100;
  const nextLevelPoints = currentUser.level * 100;
  const progressPercentage = ((currentUser.points - currentLevelPoints) / 100) * 100;

  // 獲取徽章資訊
  const getUserBadges = () => {
    return currentUser.badges.map(badgeName => {
      const badgeInfo = badgeDefinitions.find(badge => badge.name === badgeName);
      return badgeInfo || { name: badgeName, icon: '🏆', description: '特殊徽章' };
    });
  };

  const userBadges = getUserBadges();

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-primary text-white p-4">
        <h1 className="text-xl font-bold flex items-center">
          <User className="mr-2" size={24} />
          我的檔案
        </h1>
        <p className="text-sm text-primary-100">查看你的租屋成就</p>
      </div>

      <div className="p-4 space-y-6">
        {/* 使用者資訊卡片 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {currentUser.nickname.charAt(0)}
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-bold text-accent">{currentUser.nickname}</h2>
              <p className="text-gray-600">{currentUser.department} {currentUser.grade}</p>
            </div>
          </div>

          {/* 等級和點數 */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">等級 {currentUser.level}</span>
              <span className="text-sm text-gray-600">
                {currentUser.points} / {nextLevelPoints} 點數
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(progressPercentage, 100)}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              還需要 {nextLevelPoints - currentUser.points} 點數升級
            </p>
          </div>

          {/* 統計資訊 */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">{currentUser.points}</div>
              <div className="text-xs text-gray-600">總點數</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">{currentUser.level}</div>
              <div className="text-xs text-gray-600">等級</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">{currentUser.badges.length}</div>
              <div className="text-xs text-gray-600">徽章</div>
            </div>
          </div>
        </div>

        {/* 徽章展示 */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-lg font-semibold text-accent mb-4 flex items-center">
            <Award className="mr-2" size={20} />
            我的徽章 ({userBadges.length})
          </h3>
          
          {userBadges.length === 0 ? (
            <div className="text-center py-6 text-gray-500">
              <Award size={48} className="mx-auto text-gray-300 mb-2" />
              <p>還沒有獲得任何徽章</p>
              <p className="text-sm">完成任務來獲得你的第一個徽章吧！</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {userBadges.map((badge, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-primary/10 to-secondary/20 rounded-lg p-3 text-center"
                >
                  <div className="text-2xl mb-2">{badge.icon}</div>
                  <div className="font-medium text-accent text-sm">{badge.name}</div>
                  <div className="text-xs text-gray-600 mt-1">{badge.description}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 任務系統 */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <MissionList />
        </div>

        {/* 遊戲化說明 */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-lg font-semibold text-accent mb-4 flex items-center">
            <Target className="mr-2" size={20} />
            點數獲取方式
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>撰寫房源評價</span>
              <span className="text-primary font-medium">+15 點</span>
            </div>
            <div className="flex justify-between">
              <span>上傳房源照片</span>
              <span className="text-primary font-medium">+15 點</span>
            </div>
            <div className="flex justify-between">
              <span>回報房源已出租</span>
              <span className="text-primary font-medium">+10 點</span>
            </div>
            <div className="flex justify-between">
              <span>新增轉租貼文</span>
              <span className="text-primary font-medium">+15 點</span>
            </div>
            <div className="flex justify-between">
              <span>每日登入</span>
              <span className="text-primary font-medium">+5 點</span>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-secondary/30 rounded-lg">
            <h4 className="font-medium text-accent mb-2">等級規則</h4>
            <p className="text-sm text-gray-600">
              每 100 點數升一級，等級越高解鎖更多功能和特殊徽章！
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;