import { FC, useEffect } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { AuthLayout as LandingLayout, System as SystemLayout } from "../../layouts";
import {
  ActivityAnalytics,
  CreateGroup,
  Dashboard,
  Group,
  Groups,
  NewsletterAnalytics,
  NotFound,
  Profile,
  SignIn,
  Staff,
  TrafficAnalytics,
  User,
  UserAnalytics,
  Users,
} from "../../pages";
import { withCheckAuthorization, withCheckRole } from "../../hocs";
import { useApi, useAuthorization } from "../../hooks";

interface IProps {}

export const Router: FC<IProps> = (): JSX.Element => {
  const api = useApi();
  const { isAuthorized, setUser } = useAuthorization();

  useEffect(() => {
    if (isAuthorized) {
      api.account.get({}).then((user) => setUser(user));
    }
  }, []);

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
  const PageStaffWithCheckAuthorization = withCheckAuthorization(withCheckRole(Staff, "SuperAdmin"));

  return (
    <HashRouter>
      {isAuthorized ? <SystemLayout>
          <Routes>
            <Route path="/" element={<PageDashboardWithCheckAuthorization />} />
            <Route path="/users" element={<PageUsersWithCheckAuthorization />} />
            <Route path="/user/:userId" element={<PageUserWithCheckAuthorization />} />
            <Route path="/group/all" element={<PageGroupsWithCheckAuthorization />} />
            <Route path="/group/:groupId" element={<PageGroupWithCheckAuthorization />} />
            <Route path="/group/create" element={<PageCreateGroupWithCheckAuthorization />} />
            <Route path="/analytics/users" element={<PageUserAnalyticsWithCheckAuthorization />} />
            <Route path="/analytics/traffic" element={<PageTrafficAnalyticsWithCheckAuthorization />} />
            <Route path="/analytics/activity" element={<PageActivityAnalyticsWithCheckAuthorization />} />
            <Route path="/analytics/newsletter" element={<PageNewsletterAnalyticsWithCheckAuthorization />} />
            <Route path="/profile" element={<PageProfileWithCheckAuthorization />} />
            <Route path="/staff" element={<PageStaffWithCheckAuthorization />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </SystemLayout>
        :
        <LandingLayout>
          <Routes>
            <Route path="/" element={<PageDashboardWithCheckAuthorization />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </LandingLayout>
      }
    </HashRouter>
  );
};
