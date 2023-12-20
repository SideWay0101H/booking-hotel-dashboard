# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

# test 
mport React, { useEffect, useState } from 'react'
import CustomInput from '../components/CustomInput';
import ReactQuill from 'react-quill';
import { useNavigate } from "react-router-dom"
import 'react-quill/dist/quill.snow.css';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from '../features/brand/brandSlice';
import { getCategories } from '../features/pcategory/pcategorySlice';
import { getColors } from '../features/color/colorSlice';
import { Select } from "antd";
import Dropzone from 'react-dropzone'
import { delImg, uploadImg } from '../features/upload/uploadSlice';
import { createProducts, resetState } from '../features/product/productSlice';


let schema = Yup.object().shape({
  title: Yup.string().required("Title is Required"),
  description: Yup.string().required("Description is Required"),
  price: Yup.number().required("Price is Required"),
  brand: Yup.string().required("Brand is Required"),
  category: Yup.string().required("Category is Required"),
  tags: Yup.string().required("Tag is Required"),
  color: Yup
    .array()
    .min(1, "Pick at lease one color")
    .required("Colors are Required"),
  quantity: Yup.number().required("Quantity is Required"),
});

const Addproduct = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const [ color, setColor ] = useState([]);
  // const [ images, setImages ] = useState([]);
  // console.log(color);
  useEffect (() => {
    dispatch(getBrands());
    dispatch(getCategories());
    dispatch(getColors());
  }, []);
  
  const brandState = useSelector((state) => state.brand.brands);
  const cateState = useSelector((state) => state.pCategory.pCategories);
  const colorState = useSelector((state) => state.color.colors);
  const imgState = useSelector((state) => state.upload.images);
  const newProduct = useSelector((state) => state.product);
  const { isSuccess, isError, isLoading, createdProduct } = newProduct;
  useEffect(() => {
    if(isSuccess && createdProduct) {
      toast.success("Product Added Successfully !");
    }
    if(isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading, createdProduct ]);
  
  const coloropt= [];
  colorState.forEach((i) => {
    coloropt.push({
      label: i.title,
      value: i._id,
    });
  });

  const img = [];
  imgState.forEach((i) => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  });

  useEffect(() => {
    formik.values.color = color ? color : " ";
    formik.values.images = img;
  }, [color, img]);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      brand: "",
      category: "",
      tags: "",
      color: "",
      quantity: "",
      images: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      // alert(JSON.stringify(values))
      dispatch(createProducts(values));
      formik.resetForm();
      setColor(null);
      setTimeout(() => {
        dispatch(resetState());
        // navigate("/admin/list-product")
      },3000)
    },
  });
  const handleColors = (e) => {
    setColor(e);
    console.log(color); // day ne 
  }
  return (
    <div>
        <h3 className="mb-4 title">Add Product</h3>
        <div>
            <form onSubmit={formik.handleSubmit} className="d-flex gap-3 flex-column">
                <CustomInput 
                  type="text" 
                  label="Enter Product Title" 
                  name="title" 
                  onChng={formik.handleChange("title")} 
                  onBlr={formik.handleBlur("title")} 
                  val={formik.values.title}
                />
                  <div className="error">
                    {formik.touched.title && formik.errors.title}
                  </div>
                <div className="">
                    <ReactQuill 
                      theme="snow" 
                      name="description" 
                      onChange={formik.handleChange("description")} 
                      value={formik.values.description}
                    />
                </div>
                  <div className="error">
                    {formik.touched.description && formik.errors.description}
                  </div>
                <CustomInput 
                  type="number" 
                  label="Enter Product Price"
                  name="price" 
                  onChng={formik.handleChange("price")} 
                  onBlr={formik.handleBlur("price")} 
                  val={formik.values.price} 
                />
                  <div className="error">
                    {formik.touched.price && formik.errors.price}
                  </div>
                <select 
                  name="brand" 
                  onChange={formik.handleChange("brand")} 
                  onBlur={formik.handleBlur("brand")} 
                  value={formik.values.brand} 
                  className="form-control py-3 mb-3" 
                  id=""
                >
                  <option value="">Select Brand</option>
                    {brandState.map((i, j) => {
                      return (
                        <option key={j} value={i.title}>
                          {i.title}
                        </option>
                      )
                    })}
                </select>
                <div className="error">
                    {formik.touched.brand && formik.errors.brand}
                  </div>
                <select 
                  name="category" 
                  onChange={formik.handleChange("category")} 
                  onBlur={formik.handleBlur("category")} 
                  value={formik.values.category}  
                  className="form-control py-3 mb-3" 
                  id=""
                >
                    <option value="">Select Category</option>
                    {cateState.map((i, j) => {
                      return (
                        <option key={j} value={i.title}>
                          {i.title}
                        </option>
                      )
                    })}
                </select>
                  <div className="error">
                    {formik.touched.category && formik.errors.category}
                  </div>
                  <select 
                    name="tags" 
                    onChange={formik.handleChange("tags")} 
                    onBlur={formik.handleBlur("tags")} 
                    value={formik.values.tags}  
                    className="form-control py-3 mb-3" 
                    id=""
                  >
                    <option value="" disabled>Select Category</option>
                    <option value="featured">Featured</option>
                    <option value="popular">Popular</option>
                    <option value="special">Special</option>
                </select>
                  <div className="error">
                    {formik.touched.tags && formik.errors.tags}
                  </div>
                <Select 
                  mode="multiple" 
                  allowClear 
                  className="w-100"
                  placeholder="Select colors"
                  defaultValue={color}
                  onChange={(i) => handleColors(i)}
                  options = {coloropt}
                />
                <div className="error">
                  {formik.touched.color && formik.errors.color}
                </div>
                <CustomInput 
                  type="number" 
                  label="Enter Product Quantity"
                  name ="quantity"
                  onChng={formik.handleChange("quantity")} 
                  onBlr={formik.handleBlur("quantity")} 
                  val={formik.values.quantity}  
                />
                  <div className="error">
                    {formik.touched.quantity && formik.errors.quantity}
                  </div>
                  <div className="bg-white border-1 p-5 text-center">
                  <Dropzone onDrop={acceptedFiles => dispatch(uploadImg(acceptedFiles))}>
                    {({getRootProps, getInputProps}) => (
                      <section>
                        <div {...getRootProps()}>
                          <input {...getInputProps()} />
                          <p>Drag 'n' drop some files here, or click to select files</p>
                        </div>
                      </section>
                    )}
                  </Dropzone>
                  </div>
                  <div className="showimages d-flex flex-wrap gap-3">
                    {imgState?.map((i, j) => {
                      return (
                        <div className="position-relative" key={j}>
                          <button 
                            type="button"
                            onClick={() => dispatch(delImg(i.public_id))}
                            className="btn-close position-absolute"
                            style={{top: "10px", right: "10px"}}
                          ></button>
                          <img src={i.url} alt="" width={200} height={200} />
                        </div>
                      )
                    })}
                  </div>
                <button className="btn btn-success border-0 rounded-3 my-5" type="submit">
                    Add Product
                </button>
            </form>
        </div>
    </div>
  )
}
# 
///
export default Addproduct


createAsyncThunk, createAction } from '@reduxjs/toolkit';
import productService from './productService';


export const getProducts = createAsyncThunk("product/get-products", async(thunkAPI) => {
    try {
        return await productService.getProducts();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const createProducts = createAsyncThunk("product/create-products", async(productData,thunkAPI) => {
    try {
        return await productService.createProducts(productData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const resetState = createAction("Reset_all")

const initialState = {
    products: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
    // createdProducts: null,
}

export const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.products= action.payload;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(createProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createProducts.fulfilled, (state, action) => { 
                // console.log('đã vào đây ----');
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createdProduct= action.payload;
            })
            .addCase(createProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(resetState, () => initialState);
    }
});
export default productSlice.reducer;


# Tag  Ant design for file App.js replace

// <Router>
    //   <Routes>

    //     <Route path="*" element={<PageNotFound/>}/>
    //     <Route path="" element={<MainLayout />} >
    //       <Route index element={<Dashboard />} />
    //       <Route path="/add-room" element={<AddRoom />} />
    //       <Route path="/list-room" element={<RoomList />} />
    //       <Route path="/add-user" element={<AddUser />} />
    //       <Route path="/list-user" element={<UserList />} />
    //       <Route path="/add-booking" element={<AddBooking />} />
    //       <Route path="/list-booking" element={<BookingList />} />
    //     </Route>
    

    // </Routes>

    // </Router>