//src/components/TabNavigaion.tsx

import React from "react";

interface TabNavigationProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const tabs = [
    { id: "order", label: "주문내역" },
    { id: "bid", label: "입찰내역" },
    { id: "auction", label: "경매내역" },
    { id: "win", label: "낙찰내역" },
];

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, setActiveTab }) => {
    return (
        <div className="flex space-x-4 border-b border-slate-200 dark:border-slate-700">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-2 px-4 text-sm font-medium ${
                        activeTab === tab.id
                            ? "border-b-2 border-indigo-600 text-indigo-600"
                            : "text-gray-600 dark:text-gray-300"
                    }`}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
};

export default TabNavigation;
