import React, { useEffect, useState } from 'react'
import Dashboardlayout from '../../components/Layouts/DashboardLayout.jxs'
import { useUserAuth } from '../../hooks/useUserAuth';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosinstance';
import { API_PATHS } from '../../utils/apiPaths';
import InfoCard from '../../components/cards/InfoCard';
import {LuHandCoins, LuWalletMinimal} from "react-icons/lu"
import {IoMdCard} from "react-icons/io"
import { addThousendSeparator } from '../../utils/helper';
import RecentTransaction from '../../components/Dashboard/RecentTransaction';
import FinanceOverview from '../../components/Dashboard/FinanceOverview';
import ExpenseTransaction from '../../components/Dashboard/ExpenseTransaction';
import Last30DaysExpenses from '../../components/Dashboard/last30DaysExpenses';
import RecentIncomeWithChart from '../../components/Dashboard/RecentIncomeWithChart';
import RecentIncome from '../../components/Dashboard/RecentIncome';

const Home = () => {
  useUserAuth();

  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(false)

  const featchDashboardData = async () => {
    if(loading) return;

    setLoading(true)

    try {
      const response = await axiosInstance.get(`${API_PATHS.DASHBOARD.GET_DATA}`)

      if(response.data) {
        setDashboardData(response.data)
      }
    } catch (error) {
      console.log("Something went wrong, Please try again", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    featchDashboardData();
    return () => {}
  }, [])
  

  return (
    <Dashboardlayout activeMenu="Dashboard">
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <InfoCard icon={<IoMdCard/>} lable="Total Balance" value={addThousendSeparator(dashboardData?.totalBalance || 0)} color="bg-primary"/>
          <InfoCard icon={<LuWalletMinimal/>} lable="Total Income" value={addThousendSeparator(dashboardData?.totalIncome || 0)} color="bg-orange-500"/>
          <InfoCard icon={<LuHandCoins/>} lable="Total Expense" value={addThousendSeparator(dashboardData?.totalExpense || 0)} color="bg-red-500"/>

        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
          <RecentTransaction transaction={dashboardData?.recentTransaction} onSeeMore={() => navigate("/expense")} />

            <FinanceOverview totalBalance={dashboardData?.totalBalance || 0} totalIncome={dashboardData?.totalIncome || 0} totalExpense={dashboardData?.totalExpense || 0} />

            <ExpenseTransaction transactions={dashboardData?.last30DaysExpense?.transaction || []} onSeeMore={() => navigate("/expense")} />

            <Last30DaysExpenses data={dashboardData?.last30DaysExpense?.transaction || []} />

            <RecentIncomeWithChart data={dashboardData?.last60DaysIncome?.transaction.slice(0, 4) || []} totalIncome={dashboardData?.totalIncome || 0} />

            <RecentIncome transaction={dashboardData?.last60DaysIncome?.transaction || []} onSeeMore={() => navigate("/income")} />
        </div>
      </div>

    </Dashboardlayout>
  )
}

export default Home