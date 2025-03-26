/* eslint-disable @typescript-eslint/no-explicit-any */
import { UploadFile } from 'antd';
import JoditEditor from "jodit-react";
import { useMemo, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Blog } from '../../types/types';
import UploadImages from '../uploadImages/UploadImages';



const AddBlogs = () => {
    const [thumbnailFileList, setThumbnailFileList] = useState<UploadFile[]>([]);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Blog>()
    const editor = useRef<any>(null);
    const [content, setContent] = useState('');

    const config = useMemo(
        () => ({
            readonly: false,
            dropdownFullScreen: true,
            height: "300px",
        }),
        []
    );



    const [isSubmitting, setIsSubmitting] = useState(false)

    const onSubmit: SubmitHandler<Blog> = async (data) => {
        const formData = new FormData()
        setIsSubmitting(true);

        Object.keys(data).forEach((key) => {
            const value = data[key as keyof Blog];
            if (value !== undefined && value !== null) {
                formData.append(key, value.toString()); // Ensure the value is a string
            }
        });
        formData.append("description", content);
        if (thumbnailFileList[0]?.originFileObj) {
            formData.append("thumbnailImage", thumbnailFileList[0].originFileObj);
        } else {
            toast.error("Thumbnail image is required!");
            return; // Early exit if thumbnail image is missing
        }
    }





    return (
        <div className=''>
            <div className='mt-10'>
                <UploadImages multiple={false} limit={1} fileList={thumbnailFileList} setFileList={setThumbnailFileList} title='Upload Thumbnail Images *' />
                <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-10 ">

                    <div className='focus-within:text-secondary transition-all duration-200'>
                        <label htmlFor="title" className="block text-sm font-medium ">
                            Title *
                        </label>
                        <input
                            id="title"
                            type="text"
                            {...register("title", { required: "Title is required" })}
                            className="mt-1 block w-full border-b transition-all duration-200 ring-0 outline-none border-black bg-transparent focus:border-secondary focus:ring-0 focus:outline-none focus:text-secondary input" />
                        {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
                    </div>
                    <div>
                        <JoditEditor
                            ref={editor}
                            value={content}
                            config={config}
                            onBlur={(newContent: any) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                            onChange={(newContent: any) => setContent(newContent)}
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full mt-4 flex justify-center py-2 px-4 bg-secondary text-white rounded-lg"
                        >
                            {isSubmitting ? "Submitting..." : "Add New Yacht"}
                        </button>
                    </div>
                </form>


            </div>
        </div>
    );
};

export default AddBlogs;