import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

interface Role {
  id: string;
  name: string;
  permissions: string[];
}

interface Permission {
  id: string;
  name: string;
  description: string;
}

const RoleManagement: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([
    { id: 'admin', name: 'Administrator', permissions: ['manage_users', 'manage_roles', 'view_logs'] },
    { id: 'user', name: 'User', permissions: ['view_logs'] },
  ]);

  const [permissions] = useState<Permission[]>([
    { id: 'manage_users', name: 'Manage Users', description: 'Create, update, and delete user accounts' },
    { id: 'manage_roles', name: 'Manage Roles', description: 'Create, update, and delete roles' },
    { id: 'view_logs', name: 'View Logs', description: 'Access and search system logs' },
    { id: 'manage_settings', name: 'Manage Settings', description: 'Modify system-wide settings' },
  ]);

  const [newRoleName, setNewRoleName] = useState('');

  const handleAddRole = () => {
    if (newRoleName.trim()) {
      const newRole: Role = {
        id: `role_${Date.now()}`,
        name: newRoleName.trim(),
        permissions: [],
      };
      setRoles([...roles, newRole]);
      setNewRoleName('');
    }
  };

  const handleDeleteRole = (roleId: string) => {
    setRoles(roles.filter((role) => role.id !== roleId));
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    const sourceRoleIndex = roles.findIndex((role) => role.id === source.droppableId);
    const destRoleIndex = roles.findIndex((role) => role.id === destination.droppableId);

    if (source.droppableId === destination.droppableId) {
      const newPermissions = Array.from(roles[sourceRoleIndex].permissions);
      const [reorderedItem] = newPermissions.splice(source.index, 1);
      newPermissions.splice(destination.index, 0, reorderedItem);

      const newRoles = [...roles];
      newRoles[sourceRoleIndex] = {
        ...roles[sourceRoleIndex],
        permissions: newPermissions,
      };

      setRoles(newRoles);
    } else {
      const sourcePermissions = Array.from(roles[sourceRoleIndex].permissions);
      const destPermissions = Array.from(roles[destRoleIndex].permissions);

      const [movedPermission] = sourcePermissions.splice(source.index, 1);
      destPermissions.splice(destination.index, 0, movedPermission);

      const newRoles = [...roles];
      newRoles[sourceRoleIndex] = {
        ...roles[sourceRoleIndex],
        permissions: sourcePermissions,
      };
      newRoles[destRoleIndex] = {
        ...roles[destRoleIndex],
        permissions: destPermissions,
      };

      setRoles(newRoles);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-card-foreground">Role and Permission Management</h1>
      
      <div className="bg-card shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-card-foreground">Roles</h3>
          <div className="mt-2 max-w-xl text-sm text-muted-foreground">
            <p>Manage roles and their associated permissions.</p>
          </div>
          <div className="mt-5">
            <div className="flex">
              <input
                type="text"
                className="input"
                placeholder="Enter new role name"
                value={newRoleName}
                onChange={(e) => setNewRoleName(e.target.value)}
              />
              <button
                onClick={handleAddRole}
                className="btn btn-primary ml-3"
              >
                Add Role
              </button>
            </div>
          </div>

          <DragDropContext onDragEnd={onDragEnd}>
            <div className="mt-6">
              {roles.map((role) => (
                <div key={role.id} className="mb-6 bg-muted/50 p-4 rounded-md">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-medium text-card-foreground">{role.name}</h4>
                    <button
                      onClick={() => handleDeleteRole(role.id)}
                      className="px-3 py-1 text-xs font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                  <Droppable droppableId={role.id}>
                    {(provided) => (
                      <ul
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="space-y-2"
                      >
                        {role.permissions.map((permissionId, index) => {
                          const permission = permissions.find((p) => p.id === permissionId);
                          return permission ? (
                            <Draggable key={permission.id} draggableId={permission.id} index={index}>
                              {(provided) => (
                                <li
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className="bg-card p-2 rounded-md shadow-sm hover:shadow-md transition-shadow"
                                >
                                  <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium text-card-foreground">{permission.name}</span>
                                    <span className="text-xs text-muted-foreground">{permission.description}</span>
                                  </div>
                                </li>
                              )}
                            </Draggable>
                          ) : null;
                        })}
                        {provided.placeholder}
                      </ul>
                    )}
                  </Droppable>
                </div>
              ))}
            </div>
          </DragDropContext>
        </div>
      </div>

      <div className="bg-card shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-card-foreground">Available Permissions</h3>
          <div className="mt-2 max-w-xl text-sm text-muted-foreground">
            <p>Drag and drop permissions to assign them to roles.</p>
          </div>
          <div className="mt-5">
            <Droppable droppableId="available-permissions">
              {(provided) => (
                <ul
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-2"
                >
                  {permissions.map((permission, index) => (
                    <Draggable key={permission.id} draggableId={permission.id} index={index}>
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="bg-card p-2 rounded-md shadow-sm hover:shadow-md transition-shadow"
                        >
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-card-foreground">{permission.name}</span>
                            <span className="text-xs text-muted-foreground">{permission.description}</span>
                          </div>
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleManagement;