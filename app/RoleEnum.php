<?php

namespace App;

enum RoleEnum: string
{
    case SuperAdmin = 'super_admin';
    case Rektor = 'rektor';
    case AdminFakultas = 'admin_fakultas';
}
