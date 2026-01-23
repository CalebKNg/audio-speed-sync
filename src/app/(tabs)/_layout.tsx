import LibraryHeader from "@/src/components/libraryHeader";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";

export default function RootLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "#ffd33d",
                headerStyle: {
                    backgroundColor: "#25292e"
                },
                headerShadowVisible: false,
                headerTintColor: "#fff",
                tabBarStyle: {
                    backgroundColor: "#25292e"
                },

            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
                    )
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    title: "Search",
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? 'search' : 'search-outline'} color={color} size={24} />
                    )
                }}
            />
            <Tabs.Screen
                name="library"
                options={{
                    title: "Library",
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? 'albums' : 'albums-outline'} color={color} size={24} />
                    ),
                    headerRight: () => (
                        <LibraryHeader />
                    ),
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: "Settings",
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? 'settings' : 'settings-outline'} color={color} size={24} />
                    )
                }}
            />
        </Tabs>
    )
}