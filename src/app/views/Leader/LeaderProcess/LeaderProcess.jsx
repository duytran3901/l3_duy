import React from "react";
import TabPending from "app/views/Tabs/TabsLeaderProcess/TabPending";
import TabPendingSalaryIncrease from "app/views/Tabs/TabsLeaderProcess/TabPendingSalaryIncrease";
import TabPendingProcess from "app/views/Tabs/TabsLeaderProcess/TabPendingProcess";
import TabPendingProposal from "app/views/Tabs/TabsLeaderProcess/TabPendingProposal";
import { CustomTab } from "app/views/components/Custom/CustomTabs";

const LeaderProcess = () => {
    const tabs = [
        {
            label: "Chờ duyệt",
            a11yPropsIndex: 0,
            content: <TabPending />
        },
        {
            label: "Chờ duyệt tăng lương",
            a11yPropsIndex: 1,
            content: <TabPendingSalaryIncrease />
        },
        {
            label: "Chờ duyệt thăng chức",
            a11yPropsIndex: 2,
            content: <TabPendingProcess />
        },
        {
            label: "Chờ duyệt đề xuất",
            a11yPropsIndex: 3,
            content: <TabPendingProposal />
        }
    ]

    return (
        <div className="m-30">
            <CustomTab tabs={tabs}></CustomTab>
        </div>
    )
}

export default LeaderProcess;