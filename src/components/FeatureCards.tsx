
export const FeatureCard = ({ title, icon }:{title:string, icon:React.ReactNode}) => (
    <div className="flex-row justify-center items-center p-6 pb-0 space-y-0 text-center">
        <span className="flex justify-center items-center">{icon}</span>
      <h3 className="text-xl mt-4">{title}</h3>
    </div>
  );