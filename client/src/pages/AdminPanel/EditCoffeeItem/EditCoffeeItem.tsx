import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBrandsList } from "../../../store/coffeeItems/brands";
import { getCountriesList } from "../../../store/coffeeItems/countries";
import { getMethodsList } from "../../../store/coffeeItems/methods";
import { getKindsList } from "../../../store/coffeeItems/kinds";
import {
  editCoffeeItem,
  getCoffeeItemById,
} from "../../../store/coffeeItems/coffeeItems";
import { ImageLoaderField } from "../../../components";
import {
  CheckBoxField,
  SelectField,
  TextForm,
  TextAriaField,
} from "../../../ui";
import { IError, validator } from "../../../helpers/validator";
import imageAndPriceValidator, {
  ImgError,
} from "../../../helpers/imageAndPriceValidator";
import { EditCoffeeItemProps } from "./EditCoffeeItem.props";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { Images, ICoffeeItem } from "../../../models/ICoffeeItem";
import imageUpdater from "../../../helpers/imageUpdater";
import { log } from "console";

const EditCoffeeItem = ({ ...props }: EditCoffeeItemProps): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { itemId } = useParams();
  console.log(itemId);
  const currentCoffeeItem = useAppSelector(getCoffeeItemById(itemId));
  const [image, setImage] = useState<Images>();
  const [data, setData] = useState<ICoffeeItem>();
  const [errors, setErrors] = useState<IError>({});
  const [err, setErr] = useState<ImgError>({});
  const brands = useAppSelector(getBrandsList());
  const countries = useAppSelector(getCountriesList());
  const methods = useAppSelector(getMethodsList());
  const kinds = useAppSelector(getKindsList());
  const level = [
    { _id: "1", value: "1" },
    { _id: "2", value: "2" },
    { _id: "3", value: "3" },
    { _id: "4", value: "4" },
    { _id: "5", value: "5" },
    { _id: "6", value: "6" },
    { _id: "7", value: "7" },
    { _id: "8", value: "8" },
    { _id: "9", value: "9" },
    { _id: "10", value: "10" },
  ];

  useEffect(() => {
    if (currentCoffeeItem) {
      console.log(currentCoffeeItem);
      const price = {
        priceQuarter: currentCoffeeItem.price.quarter,
        priceKg: currentCoffeeItem.price.kg,
        priceDrip: currentCoffeeItem.price.drip,
      };
      setData({
        ...currentCoffeeItem,
        ...price,
      });
      setImage(currentCoffeeItem.images);
    }
  }, [currentCoffeeItem]);

  const validatorConfig = {
    brand: {
      isRequired: { message: "???????? ?????????????????????? ?????? ????????????????????" },
    },
    method: {
      isRequired: { message: "???????? ?????????????????????? ?????? ????????????????????" },
    },
    sortName: {
      isRequired: { message: "???????? ?????????????????????? ?????? ????????????????????" },
    },
    description: {
      isRequired: { message: "???????? ?????????????????????? ?????? ????????????????????" },
    },
    preparationMethod: {
      isRequired: { message: "???????? ?????????????????????? ?????? ????????????????????" },
    },
    kind: {
      isRequired: { message: "???????? ?????????????????????? ?????? ????????????????????" },
    },
    price: {
      isRequired: { message: "???????? ?????????????????????? ?????? ????????????????????" },
    },
  };
  const validate = () => {
    const errors = validator(data, validatorConfig);
    const err = imageAndPriceValidator(image, data);
    setErr(err);
    setErrors(errors);
  };

  useEffect(() => {
    validate();
  }, [data, image]);

  const handleChange = (target: {
    name: string;
    value: string | boolean | number;
  }) => {
    if (data) {
      setData((prevState) => {
        if (typeof prevState !== "undefined")
          return { ...prevState, [target.name]: target.value };
      });
    }
  };

  const handleGetImage = (
    file: string | File,
    type: "drip" | "kg" | "quarter" | "tea",
  ) => {
    setImage((prevState) => ({ ...prevState, [type]: file }));
  };

  const back = () => {
    navigate(-1);
  };

  const isValid =
    Object.keys(errors).length === 0 && Object.keys(err).length === 0;

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!data) return;
    if (image) {
      const update = await imageUpdater(image, data);
      data.images = update;
    }
    data.price = {
      quarter: data.priceQuarter,
      kg: data.priceKg,
      drip: data.priceDrip,
    };
    data.name = data.country
      ? data.country + " " + data.sortName
      : data.sortName;
    delete data.priceDrip;
    delete data.priceKg;
    delete data.priceQuarter;
    await dispatch(editCoffeeItem(data, back));
  };
  if (!brands) {
    return (
      <div className="d-flex justify-content-center w-100 mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  } else {
    return (
      <>
        {data && (
          <div className="container mt-5 mb-5 position-relative">
            <button
              className="btn btn-primary position-absolute t-2"
              style={{ left: "10%" }}
              onClick={() => navigate(-1)}
            >
              ??????????
            </button>
            <div className="row">
              <div
                className="col-md-9 offset-md-3 shadow p-4"
                style={{ maxWidth: "650px" }}
              >
                <label className="fw-700 fs-3 mb-2">???????????????? ????????????????</label>
                <form onSubmit={handleSubmit}>
                  <div className="d-flex">
                    <ImageLoaderField
                      mainImagePath={
                        data.images.quarter
                          ? "../../../" + data.images.quarter.htmlPath
                          : "img/noPhoto/noImg.jpg"
                      }
                      type="quarter"
                      getChange={handleGetImage}
                      error={!!err.all || !!err.quarter}
                      remove={true}
                    />
                    <ImageLoaderField
                      mainImagePath={
                        data.images.kg
                          ? "../../../" + data.images.kg.htmlPath
                          : "img/noPhoto/noImg.jpg"
                      }
                      type="kg"
                      getChange={handleGetImage}
                      error={!!err.all || !!err.kg}
                      remove={true}
                    />
                    <ImageLoaderField
                      mainImagePath={
                        data.images.drip
                          ? "../../../" + data.images.drip.htmlPath
                          : "img/noPhoto/noImg.jpg"
                      }
                      type="drip"
                      getChange={handleGetImage}
                      error={!!err.all || !!err.drip}
                      remove={true}
                    />
                  </div>
                  <SelectField
                    label="???????????????? ??????????"
                    value={data.brand}
                    defaultOption=""
                    name="brand"
                    options={brands}
                    getChange={handleChange}
                    error={errors.brand}
                  />
                  <SelectField
                    label="???????????????? ?????????? ??????????????????"
                    value={data.method}
                    defaultOption=""
                    name="method"
                    options={methods}
                    getChange={handleChange}
                    error={errors.method}
                  />
                  <SelectField
                    label="???????????????? ????????????"
                    value={data.country}
                    defaultOption=""
                    name="country"
                    options={countries}
                    getChange={handleChange}
                  />
                  <TextForm
                    label="?????????????? ???????????????? ?????????? ?????? ??????????"
                    name="sortName"
                    type="text"
                    value={data.sortName || ""}
                    getChange={handleChange}
                    error={errors.sortName}
                  />
                  <TextForm
                    label="?????????????? ?????????? ??????????????????????????"
                    name="preparationMethod"
                    type="text"
                    value={data.preparationMethod || ""}
                    getChange={handleChange}
                    error={errors.preparationMethod}
                  />
                  <SelectField
                    label="???????????????? ????????"
                    value={data.kind}
                    defaultOption=""
                    name="kind"
                    options={kinds}
                    getChange={handleChange}
                    error={errors.kind}
                  />
                  <TextAriaField
                    label="?????????????? ????????????????"
                    name="description"
                    value={data.description || ""}
                    getChange={handleChange}
                    error={errors.description}
                  />
                  <div className="d-flex justify-content-between">
                    <SelectField
                      label="???????????????? ?????????????? ??????????????????????"
                      value={data.acidity}
                      defaultOption={"0"}
                      name="acidity"
                      options={level}
                      getChange={handleChange}
                    />
                    <SelectField
                      label="???????????????? ?????????????? ??????????????????"
                      value={data.density}
                      defaultOption={"0"}
                      name="density"
                      options={level}
                      getChange={handleChange}
                    />
                  </div>
                  <div className="d-flex justify-content-between text-center">
                    <div className="w-25">
                      <TextForm
                        label="250"
                        name="priceQuarter"
                        type="text"
                        value={data.priceQuarter || ""}
                        getChange={handleChange}
                        error={err.all || err.quarter}
                      />
                    </div>
                    <div className="w-25">
                      <TextForm
                        label="1000"
                        name="priceKg"
                        type="text"
                        value={data.priceKg || ""}
                        getChange={handleChange}
                        error={err.all || err.kg}
                      />
                    </div>
                    <div className="w-25">
                      <TextForm
                        label="???????? ????"
                        name="priceDrip"
                        type="text"
                        value={data.priceDrip || ""}
                        getChange={handleChange}
                        error={err.all || err.drip}
                      />
                    </div>
                  </div>
                  <CheckBoxField
                    name="active"
                    value={data.active}
                    getChange={handleChange}
                  >
                    ????????????????????
                  </CheckBoxField>

                  <button
                    disabled={!isValid}
                    className="btn btn-primary ms-2 mb-2 h-25"
                  >
                    ????????????????
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
};

export default EditCoffeeItem;
