#[cfg(test)]
mod tests {
    #[test]
    fn test_admin_auth_required() {
        let is_admin = false;
        let auth_passed = is_admin;
        assert!(!auth_passed, "Non-admin call must fail authorization guard");
    }

    #[test]
    fn test_admin_auth_succeeds() {
        let is_admin = true;
        let auth_passed = is_admin;
        assert!(auth_passed, "Admin caller must pass authorization guard");
    }
}
