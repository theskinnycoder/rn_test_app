import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

function HomeScreen(): JSX.Element {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
    </View>
  );
}

function SettingsScreen(): JSX.Element {
  return (
    <View style={styles.container}>
      <Text>Settings Screen</Text>
    </View>
  );
}

interface INavigationConfig {
  name: string;
  label: string;
  header: {
    haveLogo: boolean;
    title: string;
    topIcons: Array<{
      name: string;
      type: string;
      size: number;
      color: string;
      onPress: () => void;
    }>;
    iconConfig: {
      name: string;
      type: string;
      size: number;
      color: string;
      onPress: () => void;
    };
  };
  isEnable: boolean;
  initialParams: {};
  icons: {
    active: string;
    inactive: string;
  };
  nativeID: string;
}

const bottomTabsData: INavigationConfig[] = [
  {
    name: 'Home',
    label: 'Home',
    header: {
      haveLogo: true,
      title: 'Home',
      topIcons: [
        {
          name: 'search',
          type: 'material',
          size: 24,
          color: '#000',
          onPress: () => {},
        },
      ],
      iconConfig: {
        name: 'menu',
        type: 'material',
        size: 24,
        color: '#000',
        onPress: () => {},
      },
    },
    isEnable: true,
    initialParams: {},
    icons: {
      active: 'home',
      inactive: 'home-outline',
    },
    nativeID: 'homeTab',
  },
  {
    name: 'Settings',
    label: 'Settings',
    header: {
      haveLogo: true,
      title: 'Settings',
      topIcons: [
        {
          name: 'search',
          type: 'material',
          size: 24,
          color: '#000',
          onPress: () => {},
        },
      ],
      iconConfig: {
        name: 'menu',
        type: 'material',
        size: 24,
        color: '#000',
        onPress: () => {},
      },
    },
    isEnable: true,
    initialParams: {},
    icons: {
      active: 'settings',
      inactive: 'settings-outline',
    },
    nativeID: 'settingsTab',
  },
];

function getBottomTabScreen(name: string) {
  switch (name) {
    case 'Home':
      return {Component: HomeScreen, Icon: TabBarIcon};
    case 'Settings':
      return {Component: SettingsScreen, Icon: TabBarIcon};
    default:
      return null;
  }
}

function Icon({
  name,
  onPress,
}: {
  name?: string;
  type?: string;
  size?: number;
  color?: string;
  onPress?: () => void;
}): JSX.Element {
  return <Text onPress={onPress}>{name}</Text>;
}

function TabBarIcon({
  focused,
  icons,
  color,
  children,
}: {
  focused?: boolean;
  icons?: {
    active?: string;
    inactive?: string;
  };
  color?: string;
  children?: JSX.Element;
}): JSX.Element {
  return (
    <>
      {children}
      <Icon color={color} name={focused ? icons?.active : icons?.inactive} />
    </>
  );
}

function Header({
  title,
  iconConfig,
  rightIcons,
}: {
  brand?: string;
  title?: string;
  iconConfig?: {
    name?: string;
    type?: string;
    size?: number;
    color?: string;
    onPress?: () => void;
  };
  rightIcons?: Array<{
    name?: string;
    type?: string;
    size?: number;
    color?: string;
    onPress?: () => void;
  }>;
  haveLogo?: boolean;
}): JSX.Element {
  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <Icon
          name={iconConfig?.name}
          type={iconConfig?.type}
          size={iconConfig?.size}
          color={iconConfig?.color}
          onPress={iconConfig?.onPress}
        />
      </View>
      <View style={styles.headerCenter}>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
      <View style={styles.headerRight}>
        {rightIcons?.map((icon, index) => (
          <Icon
            key={index}
            name={icon.name}
            type={icon.type}
            size={icon.size}
            color={icon.color}
            onPress={icon.onPress}
          />
        ))}
      </View>
    </View>
  );
}

export default function App(): JSX.Element {
  const Root = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Root.Navigator initialRouteName="Home">
        {bottomTabsData.map((bottomTab: INavigationConfig) => {
          const {
            name,
            label,
            header,
            isEnable = false,
            initialParams = {},
            icons = {},
            nativeID = '',
          } = bottomTab || {};
          const {title = '', topIcons = [], iconConfig} = header;
          const BottomTab = getBottomTabScreen(name);

          if (!BottomTab || !isEnable) {
            return null;
          }
          const topIconsFiltered = topIcons;
          return (
            <Root.Screen
              key={label}
              name={name}
              component={BottomTab?.Component}
              initialParams={initialParams}
              options={{
                ...(label && {
                  tabBarLabel: label,
                }),
                header: () => (
                  <Header
                    title={title}
                    iconConfig={iconConfig}
                    rightIcons={topIconsFiltered}
                  />
                ),
                tabBarIcon: ({focused, color}) => {
                  return (
                    <View nativeID={nativeID}>
                      <TabBarIcon focused={focused} icons={icons} color={color}>
                        {BottomTab.Icon && (
                          <BottomTab.Icon focused={focused} color={color} />
                        )}
                      </TabBarIcon>
                    </View>
                  );
                },
              }}
            />
          );
        })}
      </Root.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: '#fff',
    color: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  tabBar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    color: '#000',
  },
  tabButton: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '700',
    color: '#000',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    color: '#000',
    borderBottomWidth: 0.5,
  },
  headerLeft: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '33%',
  },
  headerCenter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '34%',
  },
  headerRight: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '33%',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
});
