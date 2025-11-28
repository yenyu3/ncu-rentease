import { CheckCircle, Circle, Trophy } from 'lucide-react';
import useStore from '../store/useStore';

const MissionList = () => {
  const { missions, completeMission } = useStore();

  const handleCompleteMission = (missionId) => {
    completeMission(missionId);
  };

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-accent flex items-center">
        <Trophy className="mr-2" size={20} />
        每日任務
      </h3>
      
      {missions.map((mission) => (
        <div
          key={mission.id}
          className={`p-4 rounded-lg border ${
            mission.completed
              ? 'bg-green-50 border-green-200'
              : 'bg-white border-gray-200'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center mb-2">
                {mission.completed ? (
                  <CheckCircle className="text-green-500 mr-2" size={20} />
                ) : (
                  <Circle className="text-gray-400 mr-2" size={20} />
                )}
                <h4 className={`font-medium ${
                  mission.completed ? 'text-green-700' : 'text-accent'
                }`}>
                  {mission.title}
                </h4>
              </div>
              <p className="text-sm text-gray-600 mb-2">{mission.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-primary">
                  +{mission.points} 點數
                </span>
                {!mission.completed && (
                  <button
                    onClick={() => handleCompleteMission(mission.id)}
                    className="bg-primary text-white px-3 py-1 rounded-full text-sm hover:bg-primary/80 transition-colors"
                  >
                    完成
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MissionList;