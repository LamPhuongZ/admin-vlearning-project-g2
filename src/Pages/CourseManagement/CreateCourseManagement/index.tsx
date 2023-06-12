import React, { useEffect, useState } from 'react'
import { useForm, Controller } from "react-hook-form";
import { createCourseAPI, getCategoiesCourseAPI } from '../../../Redux/Service/courseListAPI';
import { toast } from 'react-toastify';
import { DatePicker, Input, Select, Space, Upload } from 'antd';
import { useNavigate } from 'react-router-dom';
import styles from './createCourseManagement.module.scss'
import cls from "classnames";
import Button from '../../../Core/Button';
import { PlusOutlined } from '@ant-design/icons';

type Props = {}

function CreateCourseManagement({ }: Props) {
  const [categoriesCourse, setCategoriesCourse] = useState([]);
  // const [componentSize, setComponentSize] = useState("default");
  // const onFormLayoutChange = ({ size }) => {
  //   setComponentSize(size);
  // };
  // const normFile = (e) => {
  //   if (Array.isArray(e)) {
  //     return e;
  //   }
  //   return e?.fileList;
  // };

  const navigate = useNavigate();

  type CreateCourseType = {
    maKhoaHoc: string;
    biDanh: string;
    tenKhoaHoc: string;
    moTa: string;
    luotXem: number;
    hinhAnh: any;
    maNhom: string;
    ngayTao: string;
    soLuongHocVien: number;
    taiKhoanNguoiTao: string;
    maDanhMucKhoaHoc: string;
  };

  type CategoriesCourseType = {
    maDanhMuc: string;
    tenDanhMuc: string;
  }

  const { handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: {
      maKhoaHoc: "",
      biDanh: "",
      tenKhoaHoc: "",
      moTa: "",
      luotXem: 0,
      hinhAnh: "",
      maNhom: "",
      ngayTao: "01/01/1998",
      soLuongHocVien: 0,
      taiKhoanNguoiTao: "",
      maDanhMucKhoaHoc: "",
    }
  });

  const onSubmit = async (values: CreateCourseType) => {

    try {
      const payload = {
        ...values,
        hinhAnh: values.hinhAnh.file.originFileObj
      }
      console.log(payload);

      const data = await createCourseAPI(payload);
      console.log(data);

      navigate("/course-management");
    } catch (error) {
      toast.error("Thêm khóa học không thành công");
    }
  }

  // Call lấy danh mục khóa học
  const getCategoriesCourse = async () => {
    try {
      const data = await getCategoiesCourseAPI();
      setCategoriesCourse(data);
    } catch (error) {
      toast.error("Không lấy được danh mục khóa học");
    }
  };

  useEffect(() => {
    getCategoriesCourse();
  }, []);

  const renderCategoriesCourse = () => {
    return categoriesCourse.map((option: CategoriesCourseType) => {
      return (
        <Select.Option key={option.maDanhMuc} value={option.maDanhMuc}>
          {option.tenDanhMuc}
        </Select.Option>
      );
    })
  }

  return (
    <div>
      <div className={styles.textTilte}>
        <i className={cls("fa-solid fa-circle-plus", styles.icon)}></i>
        <h2>Thêm Khóa Học</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formGroup}>
          <Controller
            name="maKhoaHoc"
            control={control}
            render={({ field }) => {
              return (
                <Input
                  type='text'
                  // onChange={onChange}
                  {...field}
                  placeholder="Mã khóa học *"
                />
              )
            }}
            rules={{
              required: {
                value: true,
                message: "Mã khóa học không được để trống",
              },
            }}
          />
          {errors.maKhoaHoc && <p>{errors.maKhoaHoc.message}</p>}
        </div>

        <div className={styles.formGroup}>
          <Controller
            name="biDanh"
            control={control}
            render={({ field }) => {
              return (
                <Input
                  type='text'
                  // onChange={onChange}
                  {...field}
                  placeholder="Bí danh *"
                />
              )
            }}
            rules={{
              required: {
                value: true,
                message: "Bí danh không được để trống",
              },
            }}
          />
          {errors.biDanh && <p>{errors.biDanh.message}</p>}
        </div>

        <div className={styles.formGroup}>
          <Controller
            name="tenKhoaHoc"
            control={control}
            render={({ field }) => {
              return (
                <Input
                  type='text'
                  // onChange={onChange}
                  {...field}
                  placeholder="Tên khóa học *"
                />
              )
            }}
            rules={{
              required: {
                value: true,
                message: "Tên khóa học không được để trống",
              },
            }}
          />
          {errors.tenKhoaHoc && <p>{errors.tenKhoaHoc.message}</p>}
        </div>

        <div className={styles.formGroup}>
          <Controller
            name="moTa"
            control={control}
            render={({ field }) => {
              return (
                <Input
                  type='text'
                  // onChange={onChange}
                  {...field}
                  placeholder="Mô tả *"
                />
              )
            }}
            rules={{
              required: {
                value: true,
                message: "Mô tả không được để trống",
              },
            }}
          />
          {errors.moTa && <p>{errors.moTa.message}</p>}
        </div>

        <div className={styles.formGroup}>
          <Controller
            name="hinhAnh"
            control={control}
            render={({ field }) => {
              return (
                <Upload
                  action="/upload.do"
                  // onChange={field.onChange}
                  {...field}
                  // fileList={[]}
                  {...field}
                  listType="picture-card"
                >
                  <div>
                    <PlusOutlined />
                    <div
                      style={{
                        marginTop: 8,
                      }}
                    >
                      Upload
                    </div>
                  </div>
                </Upload>
              );
            }
            }
            rules={{
              required: {
                value: true,
                message: "Hình ảnh không được để trống",
              },
            }}
          />
          {errors.hinhAnh && <p>{errors.hinhAnh.message}</p>}
        </div>

        <div className={styles.formGroup}>
          <Controller
            name="maNhom"
            control={control}
            render={({ field }) => {
              return (
                <Input
                  type='text'
                  // onChange={onChange}
                  {...field}
                  placeholder="Mã nhóm *"
                />
              )
            }}
            rules={{
              required: {
                value: true,
                message: "Mã nhóm không được để trống",
              },
            }}
          />
          {errors.maNhom && <p>{errors.maNhom.message}</p>}
        </div>

        <div className={styles.formGroup}>
          <Controller
            name="ngayTao"
            control={control}
            render={({ field }) => {
              return (
                <Space direction="vertical" size={12}>
                  <DatePicker
                    format="DD/MM/YYYY"
                  // onChange={onChange}
                  />
                </Space>
              )
            }}
            rules={{
              required: {
                value: true,
                message: "Ngày tạo không được để trống",
              },
            }}
          />
          {errors.ngayTao && <p>{errors.ngayTao.message}</p>}
        </div>

        <div className={styles.formGroup}>
          <Controller
            name="soLuongHocVien"
            control={control}
            render={({ field }) => {
              return (
                <Input
                  type='number'
                  // onChange={onChange}
                  {...field}
                  placeholder="Số lượng học viên *"
                />
              )
            }}
            rules={{
              required: {
                value: true,
                message: "Số lượng học viên không được để trống",
              },
            }}
          />
          {errors.soLuongHocVien && <p>{errors.soLuongHocVien.message}</p>}
        </div>

        <div className={styles.formGroup}>
          <Controller
            name="taiKhoanNguoiTao"
            control={control}
            render={({ field }) => {
              return (
                <Input
                  type='text'
                  // onChange={onChange}
                  {...field}
                  placeholder="Tài khoản người tạo *"
                />
              )
            }}
            rules={{
              required: {
                value: true,
                message: "Tài khoản người tạo không được để trống",
              },
            }}
          />
          {errors.taiKhoanNguoiTao && <p>{errors.taiKhoanNguoiTao.message}</p>}
        </div>

        <div className={styles.formGroup}>
          <Controller
            name="maDanhMucKhoaHoc"
            control={control}
            render={({ field }) => {
              return (
                <Select
                  {...field}
                  // value={field.value.key}
                  style={{ width: '50rem', textAlign: 'left' }}
                  placeholder="--Chọn danh mục khóa học--"
                >
                  {renderCategoriesCourse()}
                </Select>
              )
            }}
            rules={{
              required: {
                value: true,
                message: "Vui lòng chọn danh mục khóa học",
              },
            }}
          />
          {errors.maDanhMucKhoaHoc && <p>{errors.maDanhMucKhoaHoc.message}</p>}
        </div>

        <div className={styles.formGroup}>
          <Button title='Thêm Khóa Học' bgColor='rgb(65, 178, 148)' />
        </div>
      </form>
    </div>
  )
}

export default CreateCourseManagement