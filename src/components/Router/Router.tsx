import { FC } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import {
  Dashboard,
  Groups,
  Group,
  CreateGroup,
  Users,
  UserAnalytics,
  ActivityAnalytics,
  TrafficAnalytics,
  NewsletterAnalytics,
  Profile,
  Staff,
  User,
  NotFound,
  SignIn,
} from "../../pages";
import { withCheckAuthorization, withCheckRole } from "../../hocs";

interface IProps {}

export const Router: FC<IProps> = (): JSX.Element => {
  const PageDashboardWithCheckAuthorization = withCheckAuthorization(Dashboard);
  const PageUsersWithCheckAuthorization = withCheckAuthorization(Users);
  const PageUserWithCheckAuthorization = withCheckAuthorization(User);
  const PageGroupsWithCheckAuthorization = withCheckAuthorization(Groups);
  const PageGroupWithCheckAuthorization = withCheckAuthorization(Group);
  const PageCreateGroupWithCheckAuthorization = withCheckAuthorization(CreateGroup);
  const PageUserAnalyticsWithCheckAuthorization = withCheckAuthorization(UserAnalytics);
  const PageTrafficAnalyticsWithCheckAuthorization = withCheckAuthorization(TrafficAnalytics);
  const PageActivityAnalyticsWithCheckAuthorization = withCheckAuthorization(ActivityAnalytics);
  const PageNewsletterAnalyticsWithCheckAuthorization = withCheckAuthorization(NewsletterAnalytics);
  const PageProfileWithCheckAuthorization = withCheckAuthorization(Profile);
  const PageStaffWithCheckAuthorization = withCheckAuthorization(withCheckRole(Staff), "superAdmin");

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<PageDashboardWithCheckAuthorization />} />
        <Route path="/users" element={<PageUsersWithCheckAuthorization />} />
        <Route path="/user/:userId" element={<PageUserWithCheckAuthorization />} />
        <Route path="/groups" element={<PageGroupsWithCheckAuthorization />} />
        <Route path="/group/:groupId" element={<PageGroupWithCheckAuthorization />} />
        <Route path="/group/create" element={<PageCreateGroupWithCheckAuthorization />} />
        <Route path="/analytics/users" element={<PageUserAnalyticsWithCheckAuthorization />} />
        <Route path="/analytics/traffic" element={<PageTrafficAnalyticsWithCheckAuthorization />} />
        <Route path="/analytics/activity" element={<PageActivityAnalyticsWithCheckAuthorization />} />
        <Route path="/analytics/newsletter" element={<PageNewsletterAnalyticsWithCheckAuthorization />} />
        <Route path="/profile" element={<PageProfileWithCheckAuthorization />} />
        <Route path="/staff" element={<PageStaffWithCheckAuthorization />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  );
};
