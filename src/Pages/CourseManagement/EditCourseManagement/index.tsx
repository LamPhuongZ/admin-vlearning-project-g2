
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getCategoiesCourseAPI, getInfoCourseByIdAPI, updateCourseAPI } from '../../../Redux/Service/courseListAPI';
import { toast } from 'react-toastify';
import { Input, Select, Upload } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import cls from 'classnames'
import styles from './editCourseManagement.module.scss'
import { PlusOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import Button from '../../../Core/Button';
import useCustomSelector from '../../../Hooks/useCustomSelector';

type Props = {}

function EditCourseManagement({ }: Props) {
  const [categoriesCourse, setCategoriesCourse] = useState([]);
  const [fileList, setFileList] = useState<any>([]);
  const { user } = useCustomSelector("userReducer");
  const { courseId } = useParams();
  const navigate = useNavigate();

  type UpdateCourseType = {
    maKhoaHoc: string;
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

  const { handleSubmit, control, setValue, formState: { errors } } = useForm({
    defaultValues: {
      maKhoaHoc: "",
      tenKhoaHoc: "",
      moTa: "",
      luotXem: 0,
      hinhAnh: "",
      maNhom: "GP01",
      ngayTao: "",
      soLuongHocVien: 0,
      taiKhoanNguoiTao: "",
      maDanhMucKhoaHoc: "",
    },
    mode: "onTouched",
  });

  // Xử lý hiển thị dữ liệu lên Input
  const onEditCourse = async (courseId: string) => {
    try {
      const response = await getInfoCourseByIdAPI(courseId);

      // update dữ  liệu vào ô Input
      setValue("maKhoaHoc", response.maKhoaHoc);
      setValue("tenKhoaHoc", response.tenKhoaHoc);
      setValue("moTa", response.moTa);
      setValue("luotXem", response.luotXem);
      setValue("hinhAnh", response.hinhAnh);
      setValue("maNhom", "GP01");
      setValue("ngayTao", response.ngayTao);
      setValue("soLuongHocVien", response.soLuongHocVien);
      setValue("taiKhoanNguoiTao", response.nguoiTao.taiKhoan);
      setValue("maDanhMucKhoaHoc", response.danhMucKhoaHoc.maDanhMucKhoahoc);
    } catch (error) {
      toast.error("Thông tin không thể truy cập");
    }
  };

  useEffect(() => {
    if (courseId) {
      onEditCourse(courseId);
    }
  }, [courseId]);

  const onSubmit = async (values: UpdateCourseType) => {
    if (!fileList.length) {
      toast.warning("Vui lòng chọn hình ảnh");
      return;
    }
    try {
      const data = await updateCourseAPI({
        maKhoaHoc: values.maKhoaHoc,
        tenKhoaHoc: values.tenKhoaHoc,
        moTa: values.moTa,
        luotXem: values.luotXem,
        hinhAnh:
          fileList.length && fileList[0]?.originFileObj
            ? fileList[0]?.originFileObj
            : fileList[0].url,
        maNhom: "GP01",
        ngayTao: values.ngayTao,
        soLuongHocVien: values.soLuongHocVien,
        taiKhoanNguoiTao: values.taiKhoanNguoiTao,
        maDanhMucKhoaHoc: values.maDanhMucKhoaHoc,
      });
      toast.success("Cập nhật khóa học thành công");
      navigate("/course-management");
    } catch (error) {
      toast.error("Cập nhật khóa học không thành công");
    }
  }

  useEffect(() => {
    if (user) {
      setValue("taiKhoanNguoiTao", user.taiKhoan)
    }
  }, [user]);

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
        <i className={cls("fa-solid fa-pen-to-square", styles.icon)}></i>
        <h2>Cập Nhật Thông Tin Khóa Học</h2>
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
                  disabled={true}
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
                  placeholder="--Chọn Nhóm--"

                  options={[
                    { value: 'GP01', label: 'GP01' },
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
                  value={user?.taiKhoan}
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
          <Controller
            name="hinhAnh"
            control={control}
            render={({ field }) => {
              return (
                <Upload
                  action="/upload.do"
                  {...field}
                  onChange={({ fileList: newFileList }) => {
                    setFileList(newFileList);
                  }}
                  fileList={fileList}
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
          <Button title='Cập Nhật Khóa Học' bgColor='rgb(65, 178, 148)' />
        </div>
      </form>
    </div>
  )
}

export default EditCourseManagement