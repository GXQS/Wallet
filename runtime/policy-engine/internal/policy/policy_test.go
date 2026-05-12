package policy_test

import (
	"testing"
	"time"

	"github.com/gxqs/wallet/runtime/policy-engine/internal/policy"
)

const validPolicyYAML = `
apiVersion: gxqs.io/v1alpha1
kind: GXQSPolicy
metadata:
  name: enterprise-default
  namespace: production
  version: "1.0.0"
  createdAt: 2026-01-01T00:00:00Z
spec:
  mining:
    enabled: true
    maxCPUPercent: 50
    maxGPUPercent: 80
    maxPowerWatts: 200
    idleOnly: false
    allowedSchedule: "0 2 * * *"
  validator:
    enabled: true
    maxStakeGXQS: 1000000
    minCommissionRate: 0.01
    maxCommissionRate: 0.20
    requireApproval: false
  thermal:
    maxCPUTempCelsius: 80
    maxGPUTempCelsius: 85
    throttleAtPercent: 90
  bandwidth:
    maxUploadMbps: 100
    maxDownloadMbps: 500
  deploy:
    allowedRegions:
      - us-east-1
      - eu-west-1
    requireApproval: true
    maxFleetSize: 50
`

func TestParseValidPolicy(t *testing.T) {
	p, err := policy.Parse([]byte(validPolicyYAML))
	if err != nil {
		t.Fatalf("Parse: unexpected error: %v", err)
	}
	if p.Metadata.Name != "enterprise-default" {
		t.Errorf("expected name %q, got %q", "enterprise-default", p.Metadata.Name)
	}
	if p.Spec.Mining.MaxCPUPercent != 50 {
		t.Errorf("expected MaxCPUPercent=50, got %v", p.Spec.Mining.MaxCPUPercent)
	}
	if len(p.Spec.Deploy.AllowedRegions) != 2 {
		t.Errorf("expected 2 allowed regions, got %d", len(p.Spec.Deploy.AllowedRegions))
	}
}

func TestParseMissingAPIVersion(t *testing.T) {
	yaml := `
kind: GXQSPolicy
metadata:
  name: test
spec: {}
`
	_, err := policy.Parse([]byte(yaml))
	if err == nil {
		t.Fatal("expected error for missing apiVersion")
	}
}

func TestParseWrongKind(t *testing.T) {
	yaml := `
apiVersion: gxqs.io/v1alpha1
kind: WrongKind
metadata:
  name: test
spec: {}
`
	_, err := policy.Parse([]byte(yaml))
	if err == nil {
		t.Fatal("expected error for wrong kind")
	}
}

func TestParseInvalidCPUPercent(t *testing.T) {
	yaml := `
apiVersion: gxqs.io/v1alpha1
kind: GXQSPolicy
metadata:
  name: test
spec:
  mining:
    maxCPUPercent: 150
`
	_, err := policy.Parse([]byte(yaml))
	if err == nil {
		t.Fatal("expected error for CPU percent > 100")
	}
}

func TestParseInvalidCommissionRange(t *testing.T) {
	yaml := `
apiVersion: gxqs.io/v1alpha1
kind: GXQSPolicy
metadata:
  name: test
spec:
  mining:
    maxCPUPercent: 50
  validator:
    minCommissionRate: 0.5
    maxCommissionRate: 0.1
`
	_, err := policy.Parse([]byte(yaml))
	if err == nil {
		t.Fatal("expected error for min > max commission rate")
	}
}

func TestMetadataCreatedAt(t *testing.T) {
	p, err := policy.Parse([]byte(validPolicyYAML))
	if err != nil {
		t.Fatalf("Parse: %v", err)
	}
	if p.Metadata.CreatedAt.IsZero() {
		t.Fatal("expected non-zero createdAt")
	}
	if p.Metadata.CreatedAt.Year() != 2026 {
		t.Errorf("expected year 2026, got %d", p.Metadata.CreatedAt.Year())
	}
	_ = time.Now() // ensure time package used
}
