/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import * as z from "zod";
import { useLoginMutation } from "../../Redux/apis/auth/authApi";
import { useAppDispatch } from "../../Redux/hook";
import { setUser } from "../../Redux/slice/auth/authSlice";
import { useGetCallbackQuery } from "../../Redux/apis/calender/calender";

// Define Zod schema for validation
const formSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address" }).min(1, { message: "Email is required" }),
    password: z
        .string()
        .min(6, { message: "Password should be at least 6 characters long" })
        .min(1, { message: "Password is required" }),
    rememberMe: z.boolean().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function SignInPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()
    const [login] = useLoginMutation()
    const dispatch = useAppDispatch()


    const location = useLocation();

    // This will parse the query string
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get('code');
    const scope = queryParams.get('scope');

    console.log(code, scope);
    const { data: callback } = useGetCallbackQuery(
        {
            code: code,  // your code value
            scope: scope // your scope value
        },
        {
            skip: !code || !scope // Skip if either code or scope is missing
        }
    );

    // Use React Hook Form with Zod resolver
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
    });

    const onSubmit = async (data: FormValues) => {
        // console.log(data, 'data');
        setIsLoading(true)
        try {
            // Call the login mutation
            const response = await login(data).unwrap()

            // Handle successful login (store token, redirect, etc.)

            if (response?.data.accessToken) {
                Cookies.set('token', response?.data.accessToken)
                const decodedUser = jwtDecode(response.data.accessToken as string) as { role: string };
                if (code && scope) {
                    console.log(code, scope, callback);
                }
                console.log(decodedUser, 'decodedUser');
                dispatch(setUser({ user: decodedUser, token: response.data.accessToken })); // Store user in Redux
                toast.success(`Welcome ${decodedUser.role} Dashboard!`);
                if (decodedUser.role === "CLINICIAN") {
                    navigate("/clinician")
                }
                else {

                    navigate("/dashboard")
                }
            }

            // toast.success("User Logged In Succes")

        } catch (error: any) {
            toast.error(error.data.message)
            // Handle errors (e.g., display an error message)
        } finally {
            setIsLoading(false)
        }

    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="w-full min-h-screen flex items-center justify-center">
            <div className="lg:min-w-[500px] h-full mx-auto">
                <div className="flex flex-col items-center mb-8">
                    <h1 className="text-2xl font-bold mb-2">Hi, Welcome Back! 👋</h1>
                    <p className="text-gray-500 text-sm">Please Enter Your Email And Password Below!</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full">
                    {/* Email Input */}
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium block">
                            Email address
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="georgiayoung@example.com"
                            {...register("email")}
                            className={`w-full px-3 py-2 border ${errors.email ? "border-red-500" : "border-gray-200"
                                } rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500`}
                        />
                        {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                    </div>

                    {/* Password Input */}
                    <div className="space-y-2">
                        <label htmlFor="password" className="text-sm font-medium block">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••••"
                                {...register("password")}
                                className={`w-full px-3 py-2 border ${errors.password ? "border-red-500" : "border-gray-200"
                                    } rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500`}
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? <LuEyeOff size={18} /> : <LuEye size={18} />}
                            </button>
                        </div>
                        {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full cursor-pointer bg-primary/80 text-white py-2 px-4 rounded-md hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    >
                        {isLoading ? "Logging in..." : "Log In"}
                    </button>
                </form>
            </div>
        </div>
    );
}