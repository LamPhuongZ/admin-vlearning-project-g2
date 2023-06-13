
import React, { useEffect, useState } from 'react'
import { useForm, Controller } from "react-hook-form";
import { createCourseAPI, getCategoiesCourseAPI } from '../../../Redux/Service/courseListAPI';
import { toast } from 'react-toastify';
import { Input, Select, Upload } from 'antd';
import { useNavigate } from 'react-router-dom';
import styles from './createCourseManagement.module.scss'
import cls from "classnames";
import Button from '../../../Core/Button';
import { PlusOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import useCustomSelector from '../../../Hooks/useCustomSelector';
import { listUserTeacherRequest } from '../../../Redux/Service/listUserAPI';

type Props = {}

function CreateCourseManagement({ }: Props) {
  const [categoriesCourse, setCategoriesCourse] = useState([]);
  const [listTeacher, setListTeacher] = useState([]);
  const { user } = useCustomSelector("userReducer");
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
  };

  type ListTeacherType = {
    taiKhoan: string;
  };

  const { handleSubmit, setValue, control, formState: { errors } } = useForm({
    defaultValues: {
      maKhoaHoc: "",
      biDanh: "",
      tenKhoaHoc: "",
      moTa: "",
      luotXem: 0,
      hinhAnh: "",
      maNhom: "",
      ngayTao: "",
      soLuongHocVien: 0,
      taiKhoanNguoiTao: "",
      maDanhMucKhoaHoc: "",
    }
  });

  const onSubmit = async (values: CreateCourseType) => {
    try {
      const payload = {
        ...values,
        hinhAnh: values.hinhAnh?.file?.originFileObj
      }

      const data = await createCourseAPI(payload);
      navigate("/course-management");
    } catch (error) {
      toast.error("Thêm khóa học không thành công");
    }
  };

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

  useEffect(() => {
    if (user) {
      setValue("taiKhoanNguoiTao", user.taiKhoan)
    }
  }, [user])

  const renderCategoriesCourse = () => {
    return categoriesCourse.map((option: CategoriesCourseType) => {
      return (
        <Select.Option key={option.maDanhMuc} value={option.maDanhMuc}>
          {option.tenDanhMuc}
        </Select.Option>
      );
    })
  };

  // Call lấy danh sách giảng viên
  const getlistUserTeacher = async () => {
    try {
      const data = await listUserTeacherRequest();
      setListTeacher(data);
    } catch (error) {
      toast.error("Không lấy được danh sách giảng viên");
    }
  };

  useEffect(() => {
    getlistUserTeacher();
  }, []);

  const renderlistUserTeacher = () => {
    return listTeacher.map((option: ListTeacherType) => {
      return (
        <Select.Option key={option.taiKhoan} value={option.taiKhoan}>
          {option.taiKhoan}
        </Select.Option>
      );
    })
  };

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
            name="luotXem"
            control={control}
            render={({ field }) => {
              return (
                <Input
                  type='number'
                  {...field}
                  value={undefined}
                  placeholder="Lượt xem"
                />
              )
            }}
            rules={{
              required: true,
            }}
          />
          {errors.soLuongHocVien && <p>{errors.soLuongHocVien.message}</p>}
        </div>

        <div className={styles.formGroup}>
          <Controller
            name="maNhom"
            control={control}
            render={({ field }) => {
              return (
                <Select
                  style={{ width: '50rem', textAlign: 'left' }}
                  {...field}
                  value={undefined}
                  placeholder="--Chọn Nhóm--"

                  options={[
                    { value: 'GP01', label: 'GP01' },
                    { value: 'GP02', label: 'GP02' },
                    { value: 'GP03', label: 'GP03' },
                    { value: 'GP04', label: 'GP04' },
                    { value: 'GP05', label: 'GP05' },
                    { value: 'GP06', label: 'GP06' },
                    { value: 'GP07', label: 'GP07' },
                    { value: 'GP08', label: 'GP08' },
                    { value: 'GP09', label: 'GP09' },
                    { value: 'GP10', label: 'GP10' },
                    { value: 'GP11', label: 'GP11' },
                    { value: 'GP12', label: 'GP12' },
                    { value: 'GP13', label: 'GP13' },
                    { value: 'GP14', label: 'GP14' },
                    { value: 'GP15', label: 'GP15' },
                  ]}
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
                <Input
                  type='text'
                  {...field}
                  placeholder='Ngày Tạo (DD/MM/YYYY) *'
                />
              )
            }}
            rules={{
              required: {
                value: true,
                message: "Ngày tạo không được để trống",
              },
              pattern: {
                value: /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/,
                message: "Vui lòng nhập đúng định dạng DD/MM/YYYY",
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
                  {...field}
                  value={undefined}
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
                  {...field}
                  disabled
                  placeholder="Tài khoản người tạo *"
                />
                // <Select
                //   {...field}
                //   style={{ width: '50rem', textAlign: 'left' }}
                //   value={undefined}
                //   placeholder="--Chọn Tài khoản người tạo--"
                // >
                //   {renderlistUserTeacher()}
                // </Select>
              )
            }}
            rules={{
              required: {
                value: true,
                message: "Vui lòng chọn tài khoản",
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
                  style={{ width: '50rem', textAlign: 'left' }}
                  value={undefined}
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
          <Controller
            name="hinhAnh"
            control={control}
            render={({ field }) => {
              return (
                <Upload
                  action="/upload.do"
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
            name="moTa"
            control={control}
            render={({ field }) => {
              return (
                <TextArea
                  style={{ width: '50rem', textAlign: 'left' }}
                  {...field}
                  rows={8}
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
          <Button title='Thêm Khóa Học' bgColor='rgb(65, 178, 148)' />
        </div>
      </form>
    </div>
  )
}

export default CreateCourseManagement