"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { resetSchema } from "@/lib/zod-schema/resetSchema";
import { resetType } from "@/lib/zod-type/resetType";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface ResetPasswordProps {
  onSubmit: (data: resetType) => void;
}

const ResetPassword: React.FC<ResetPasswordProps> = ({ onSubmit }) => {
  const form = useForm<resetType>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="w-full text-center">
          <p className="font-bold">Reset Password</p>
          <p className="font-normal">Enter your new password</p>
        </div>
        <div className="space-y-4 mt-4">
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter New Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm New Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full text-white" type="submit">
            {form.formState.isSubmitting ? (
              <div className="w-8 h-8">
                <LoaderComponent className="text-white" />
              </div>
            ) : (
              // <p className="text-black font-bold">Sign in1</p>
              <p className="text-white font-bold"> Complete!</p>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ResetPassword;
