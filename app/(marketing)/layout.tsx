const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-slate-100 h-full">
      <main className="pt-40 pb-20 bg-slate-100">{children}</main>
    </div>
  );
};

export default MarketingLayout;
