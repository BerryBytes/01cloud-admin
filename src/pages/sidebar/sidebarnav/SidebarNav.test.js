import React from "react";
import { SidebarNav } from "./SidebarNav";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { findByTestAttr } from "../../../helpers/utils";
import paths from "../../../constants/paths";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import MemoryIcon from "@material-ui/icons/Memory";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import BubbleChartIcon from "@material-ui/icons/BubbleChart";
import PowerIcon from "@material-ui/icons/Power";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import PaymentIcon from "@material-ui/icons/Payment";
import ReceiptIcon from "@material-ui/icons/Receipt";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import DescriptionIcon from "@material-ui/icons/Description";
import BallotIcon from "@material-ui/icons/Ballot";
import FormatListNumberedRtlIcon from "@material-ui/icons/FormatListNumberedRtl";
import GroupWorkIcon from "@material-ui/icons/GroupWork";
import RecentActorsIcon from "@material-ui/icons/RecentActors";
import SpeakerGroupOutlinedIcon from "@material-ui/icons/SpeakerGroupOutlined";
import AmpStoriesOutlinedIcon from "@material-ui/icons/AmpStoriesOutlined";
import ConfirmationNumberIcon from "@material-ui/icons/ConfirmationNumber";
import DnsIcon from "@material-ui/icons/Dns";
import DvrIcon from "@material-ui/icons/Dvr";
import OfflineBoltIcon from '@material-ui/icons/OfflineBolt';
import PermDataSettingIcon from '@material-ui/icons/PermDataSetting';

configure({ adapter: new Adapter() });

const navLinks = [
  {
    navText: "Dashboard",
    toLink: paths.DASHBOARD,
    active: true,
    icon: <DashboardIcon />,
  },
  {
    navText: "User",
    icon: <RecentActorsIcon />,
    subNavs: [
      {
        navText: "Users",
        toLink: paths.USERS,
        active: false,
        icon: <PeopleIcon />,
      },
      {
        navText: "Invitations",
        toLink: paths.INVITATIONS,
        active: false,
        icon: <AssignmentIndIcon />,
      },
    ],
    expanded: false,
  },
  {
    navText: "Organizations",
    icon: <AccountBalanceIcon />,
    subNavs: [
      {
        navText: "Organization List",
        toLink: paths.ORGANIZATIONLIST,
        active: false,
        icon: <FormatListNumberedRtlIcon />,
      },
    ],
    expanded: false,
  },
  {
    navText: "Subscription",
    icon: <LocalAtmIcon />,
    expanded: false,
    subNavs: [
      {
        navText: "Project Subscription",
        toLink: paths.SUBSCRIPTION,
        active: false,
        icon: <AmpStoriesOutlinedIcon />,
      },
      {
        navText: "Org Subscription",
        toLink: paths.ORG_SUBSCRIPTION,
        active: false,
        icon: <SpeakerGroupOutlinedIcon />,
      },
    ],
  },
  {
    navText: "Resources",
    toLink: paths.RESOURCES,
    active: false,
    icon: <MemoryIcon />,
  },
  {
    navText: "Plugin",
    toLink: paths.PLUGIN,
    active: false,
    icon: <PowerIcon />,
  },
  {
    navText: "Cluster",
    icon: <GroupWorkIcon />,
    subNavs: [
      {
        navText: "Clusters",
        toLink: paths.CLUSTER,
        active: false,
        icon: <BubbleChartIcon />,
      },
      {
        navText: "Registry",
        toLink: paths.REGISTRIES,
        active: false,
        icon: <DvrIcon />,
      },
      {
        navText: "DNS",
        toLink: paths.DNS,
        active: false,
        icon: <DnsIcon />,
      },
      {
        navText: "Operators",
        toLink: paths.OPERATORS,
        active: false,
        icon: <OfflineBoltIcon />,
      },
    ],
    expanded: false,
  },
  {
    navText: "Tickets",
    toLink: paths.SUPPORT,
    active: false,
    icon: <ConfirmationNumberIcon />,
  },
  {
    navText: "LoadBalancers",
    toLink: paths.LOADBALANCERS,
    active: false,
    icon: <BallotIcon />,
  },
  {
    navText: "Billing",
    icon: <DescriptionIcon />,
    subNavs: [
      {
        navText: "Promo Code",
        toLink: paths.BILLING,
        active: false,
        icon: <MonetizationOnIcon />,
      },
      {
        navText: "Deductions",
        toLink: paths.DEDUCTIONS,
        active: false,
        icon: <RemoveCircleOutlineIcon />,
      },
      {
        navText: "Gateways",
        toLink: paths.GATEWAY,
        active: false,
        icon: <AccountBalanceIcon />,
      },
      {
        navText: "Invoice",
        toLink: paths.INVOICE,
        active: false,
        icon: <ReceiptIcon />,
      },
      {
        navText: "Payments",
        toLink: paths.PAYMENT,
        active: false,
        icon: <PaymentIcon />,
      },
    ],
    expanded: false,
  },
  {
    navText: "Settings",
    toLink: paths.SETTINGS,
    active: false,
    icon: <PermDataSettingIcon />,
  },
];

const updateNav = jest.fn();

const setUp = (props = {}, state = {}) => {
  let newProps = {
    navLinks,
    updateNav,
    nav: navLinks[0],
    history: { push: jest.fn() },
    ...props,
  };

  const component = shallow(<SidebarNav classes={{}} {...newProps} />);

  component.setState({
    ...state,
  });

  return component;
};

describe("SidebarNav Component", () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });

  it("should render sidebarnav main container", () => {
    const wrapper = findByTestAttr(component, "sidebarnav-main-container");
    expect(wrapper.length).toBe(1);
  });

  it("it should render sidebarnav links", () => {
    const sidebarNavlinks = findByTestAttr(component, "sidebarnav-item");
    expect(sidebarNavlinks.length).toBe(11);
  });

  it("should render sidebarnavLink for each navLink item", () => {
    const sidebarNavlinks = findByTestAttr(component, "sidebarnav-item");

    sidebarNavlinks.forEach(l => {
      const link = findByTestAttr(l, "sidebarnav-item-link");
      expect(link.length).toBe(1);
    });
  });

  it("should render sidebarnavLink with correct 'to' prop and linkText for each navLinks", () => {
    const sidebarNavlinks = findByTestAttr(component, "sidebarnav-item");

    sidebarNavlinks.forEach((l, i) => {
      const link = findByTestAttr(l, "sidebarnav-item-link");
      if (navLinks[i].toLink) {
        expect(link.props().to).toBe(navLinks[i].toLink);
      } else {
        expect(link.props().to).toBe("#");
      }

      const linkText = findByTestAttr(l, "sidebarnav-item-link-text");
      expect(linkText.text()).toBe(navLinks[i].navText);
    });
  });

  it("should call handleActiveNav for click on navLink with toLink and update navLinks", () => {
    const sidebarNavlinks = findByTestAttr(component, "sidebarnav-item");

    sidebarNavlinks.forEach((l, i) => {
      const link = findByTestAttr(l, "sidebarnav-item-link");
      if (navLinks[i].toLink) {
        link.props().onClick(null, navLinks[i].navText);
        expect(component.state().navLinks[i].active).toBe(true);
      }
    });
  });

  it("should call handleToggle on navLink click nad update navLinks", () => {
    const sidebarNavlinks = findByTestAttr(component, "sidebarnav-item");

    sidebarNavlinks.forEach((l, i) => {
      if (!navLinks[i].toLink) {
        const link = findByTestAttr(l, "sidebarnav-item-link");
        link.props().onClick(navLinks[i].navText);
        expect(component.state().navLinks[i].expanded).toBe(true);
      }
    });
  });

  it("should render nested navLinks with correct 'to' prop and navLink text", () => {
    const sidebarNavlinks = findByTestAttr(component, "sidebarnav-item");

    sidebarNavlinks.forEach((l, i) => {
      if (!navLinks[i].toLink) {
        const nestedNavLink = findByTestAttr(l, "sidebarnav-item-expanse");

        expect(nestedNavLink.length).toBe(1);

        const sidebarNavSubLinks = findByTestAttr(
          nestedNavLink,
          "sidebar-nav-sub-item"
        );

        sidebarNavSubLinks.forEach((sl, j) => {
          const link = findByTestAttr(sl, "sidebar-nav-sub-item-link");
          expect(link.props().to).toBe(navLinks[i].subNavs[j].toLink);

          const linkText = findByTestAttr(sl, "sidebar-nav-sub-item-linkText");
          expect(linkText.text()).toBe(navLinks[i].subNavs[j].navText);
        });
      }
    });
  });

  it("should call handleActiveNav and update navLinks for click on nested navLinks", () => {
    const sidebarNavlinks = findByTestAttr(component, "sidebarnav-item");

    sidebarNavlinks.forEach((l, i) => {
      if (!navLinks[i].toLink) {
        const nestedNavLink = findByTestAttr(l, "sidebarnav-item-expanse");

        expect(nestedNavLink.length).toBe(1);

        const sidebarNavSubLinks = findByTestAttr(
          nestedNavLink,
          "sidebar-nav-sub-item"
        );

        sidebarNavSubLinks.forEach((sl, j) => {
          const link = findByTestAttr(sl, "sidebar-nav-sub-item-link");

          link.props().onClick(null, navLinks[i].subNavs[j].navText);
          expect(component.state().navLinks[i].subNavs[j].active).toBe(true);
        });
      }
    });
  });
});
