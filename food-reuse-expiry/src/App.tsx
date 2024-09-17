import { Chat } from "@/Chat/Chat";
import { ChatIntro } from "@/Chat/ChatIntro";
import { Layout } from "@/Layout";
import { SignInForm } from "@/SignInForm";
import { UserMenu } from "@/components/UserMenu";
import FoodEntryForm from "@/components/EntertheFoodItems";
import WelcomePage from "./components/welcomePage";
import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

export default function App() {
  const user = useQuery(api.users.viewer);
  return (
    <Layout
      menu={
        <Authenticated>
          <UserMenu>{user?.name ?? user?.email}</UserMenu>
        </Authenticated>
      }
    >
      <>
        <Authenticated>
          {/* <ChatIntro />
          <Chat viewer={(user ?? {})._id!} /> */}
          {/* <WelcomePage
              title="Food Wastage"
              recipeLink="/recipes"
              homeLink="/"
              aboutLink="/about"
              trackExpiryLink="/track-expiry"
              loginLink="/login"
              signupLink="/signup"
            /> */}
          
         
         
         
          <FoodEntryForm userId={(user ?? {})._id!} />  
        </Authenticated>
        <Unauthenticated>
          <SignInForm />
        </Unauthenticated>
      </>

    </Layout>
    
  );
}
