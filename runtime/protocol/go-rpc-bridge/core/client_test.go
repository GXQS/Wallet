package core

import "testing"

func TestNormalizeTarget(t *testing.T) {
	t.Parallel()

	tests := []struct {
		name    string
		input   string
		want    string
		wantErr bool
	}{
		{name: "host port", input: "127.0.0.1:9090", want: "127.0.0.1:9090"},
		{name: "dns target", input: "dns:///core:9090", want: "dns:///core:9090"},
		{name: "http rejected", input: "http://127.0.0.1:9090", wantErr: true},
		{name: "https rejected", input: "https://core.example.com:443", wantErr: true},
		{name: "empty rejected", input: " ", wantErr: true},
	}

	for _, tt := range tests {
		tt := tt
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()
			got, err := normalizeTarget(tt.input)
			if tt.wantErr {
				if err == nil {
					t.Fatalf("expected error for %q", tt.input)
				}
				return
			}
			if err != nil {
				t.Fatalf("unexpected error: %v", err)
			}
			if got != tt.want {
				t.Fatalf("expected %q, got %q", tt.want, got)
			}
		})
	}
}
