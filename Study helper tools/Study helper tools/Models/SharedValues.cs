﻿using Study_helper_tools.Database;

namespace Study_helper_tools.Models
{
    public static class SharedValues
    {
        public static User CurUser = null;
        public static string AnalyticsActive = "";
        public static string DashBoardActive = "";
        public static string ToDoActive = "";
        public static string PromdoroActive = "";
        public static List<ToDo> CurUserTasks = new List<ToDo>();
        public static List<ToDo> CurUserAchievedTasks = new List<ToDo>();
        public static List<ToDo> CurUserNotAchievedTasks = new List<ToDo>();
        public static ToDo CurTask = null;

        public static int totalAchievedTasks = 0;
        public static int totalNotAchievedTasks = 0;
        public static long totalAchievedTime = 0;
        public static void setCurUser(User user)
        {
            CurUser = user;
        }

        public static void setActive(string activeOne)
        {
            if (activeOne == "Analytics")
            {
                AnalyticsActive = "active";
                setNull("Analytics");
            }
            if (activeOne == "DashBoard")
            {
                DashBoardActive = "active";
                setNull("DashBoard");
            }
            if (activeOne == "ToDo")
            {
                ToDoActive = "active";
                setNull("ToDo");
            }
            if (activeOne == "Promdoro")
            {
                PromdoroActive = "active";
                setNull("Promdoro");
            }
        }
        public static void setNull(string activeOne)
        {
            if (activeOne != "Analytics")
            {
                AnalyticsActive = "";
            }
            if (activeOne != "DashBoard")
            {
                DashBoardActive = "";
            }
            if (activeOne != "ToDo")
            {
                ToDoActive = "";
            }
            if (activeOne != "Promdoro")
            {
                PromdoroActive = "";
            }
        }

        public static void setTasks()
        {
            SharedValues.CurUserNotAchievedTasks.Clear();
            SharedValues.CurUserAchievedTasks.Clear();
            totalAchievedTasks = 0;
            totalNotAchievedTasks = 0;
            totalAchievedTime = 0;
            foreach (var item in CurUserTasks)
            {
                if (item.IsDone)
                {
                    CurUserAchievedTasks.Add(item);
                    totalAchievedTasks++;
                }
                else if (!item.IsDone)
                {
                    CurUserNotAchievedTasks.Add(item);
                    totalNotAchievedTasks++;
                }
                totalAchievedTime += item.TimePerTask;
            }
        }

        public static void setAllNull()
        {
            SharedValues.CurUser = null;
            SharedValues.AnalyticsActive = "";
            SharedValues.DashBoardActive = "";
            SharedValues.ToDoActive = "";
            SharedValues.PromdoroActive = "";
            SharedValues.CurUserTasks.Clear();
            SharedValues.CurUserAchievedTasks.Clear();
            SharedValues.CurUserNotAchievedTasks.Clear();
        }
    }
}
