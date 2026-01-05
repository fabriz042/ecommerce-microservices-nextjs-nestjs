"use client";
import { useEffect, useState } from "react";
import useDebounce from "@packages/shared-front/hooks/useDebounce";

import { MdAdd } from "react-icons/md";

import { StatusAdmin, getAdminStatus, deleteStatus } from "@packages/shared-front/modules/status";

import AddStatus from "./dialogs/AddStatus";
import { DeleteConfirm } from "@/components/dialogs/DeleteConfirm";
import { Table, Column } from "@/components/ui/CustomTable";
import { Notification } from "@/components/dialogs/Notification";
import EditStatus from "./dialogs/EditStatus";

export default function StatusPage() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isNotificationLabel, setIsNotificationLabel] = useState<string>("");

  const [statusToDelete, setStatusToDelete] = useState<StatusAdmin | null>(null);
  const [statusToEdit, setStatusToEdit] = useState<StatusAdmin | null>(null);
  const [statuses, setStatuses] = useState<StatusAdmin[]>([]);
  const [meta, setMeta] = useState({ has_next: false, has_previous: false });

  const [name, setName] = useState("");
  const debouncedName = useDebounce(name);

  const [page, setPage] = useState(1);
  const [per_page, setPerPage] = useState(10);

  const fetchStatuses = async () => {
    try {
      const response = await getAdminStatus({
        search: name,
        page: page,
        per_page: per_page,
      });

      setStatuses(response.data);
      setMeta(response.meta);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchStatuses();
  }, [debouncedName, page, per_page, page]);

  const handleDelete = (status: StatusAdmin) => {
    setStatusToDelete(status);
    setIsDeleteDialogOpen(true);
  };

  const handleEdit = (status: StatusAdmin) => {
    setStatusToEdit(status);
    setIsEditDialogOpen(true);
  }

  const handleConfirmDelete = async (id: string) => {
    try {
      await deleteStatus(id);
      fetchStatuses();
      setIsNotificationLabel("Status deleted successfully");
    } catch (error) {
      setIsNotificationLabel("Error deleting status");
    }
    setIsNotificationOpen(true);
    setIsDeleteDialogOpen(false);
    setStatusToDelete(null);
  };

  const columns: Column<StatusAdmin>[] = [
    { key: "name", label: "Nombre" },
  ];

  return (
    <div className="m-4 p-8 debaug bg-white h-screen rounded-lg">
      {/* ---------Title--------- */}
      <h1 className="text-3xl font-bold mb-12">Status</h1>

      <div className="flex justify-between items-center mb-6">

        {/* ------------Search------------ */}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Search products..."
          className="p-2 border rounded w-full max-w-150"
        />

        {/* ------------Add Product Button------------ */}
        <div
          className="flex items-center justify-center rounded cursor-pointer px-4 py-2 font-bold text-white bg-green-500 shadow-lg"
          onClick={() => setIsAddDialogOpen(true)
          }>
          Agregar
          <MdAdd size={32} />
        </div>
      </div>

      {/* ------------Table to display products----------- */}
      <Table
        columns={columns}
        data={statuses}
        page={page}
        per_page={per_page}
        meta={meta}
        onPageChange={setPage}
        onRowsPerPageChange={setPerPage}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* ---------------Dialogs-------------- */}
      {isAddDialogOpen && (
        <AddStatus
          onClose={() => setIsAddDialogOpen(false)}
          onSave={() => {
            setIsAddDialogOpen(false);
            fetchStatuses();
            setIsNotificationLabel("Status added successfully");
            setIsNotificationOpen(true);
          }}
        />
      )}

      {isEditDialogOpen && statusToEdit && (
        <EditStatus
          status={statusToEdit}
          onClose={() => setIsEditDialogOpen(false)}
          onSave={() => {
            setIsEditDialogOpen(false);
            fetchStatuses();
            setIsNotificationLabel("Status saved successfully");
            setIsNotificationOpen(true);
          }}
        />
      )}

      {isDeleteDialogOpen && (
        <DeleteConfirm
          onConfirm={async () => {
            if (statusToDelete) {
              await handleConfirmDelete(statusToDelete.id);
            }
          }}
          itemName={statusToDelete!.name}
          onCancel={() => {
            setIsDeleteDialogOpen(false);
          }}
        />
      )}

      {isNotificationOpen && (
        <Notification
          onClose={() => setIsNotificationOpen(false)}
          label={isNotificationLabel}
        />
      )}
    </div>
  );
}
